const Product = require('../models/Product');
const localStore = require('../utils/localStore');

// 1. CREATE A PRODUCT LISTING (Protected)
exports.createProduct = async (req, res) => {
  try {
    const { title, description, price, category, images, sellerEmail, sellerContact } = req.body;
    const useLocalStore = req.app.get('useLocalStore');

    if (!sellerEmail || !sellerContact) {
      return res.status(400).json({ message: 'Seller email and contact are required.' });
    }

    if (useLocalStore) {
      const newProduct = await localStore.createProduct({
        title,
        description,
        price,
        category,
        images,
        sellerEmail,
        sellerContact,
        seller: req.user.id,
      });

      return res.status(201).json({
        ...newProduct,
        seller: { id: req.user.id },
      });
    }

    const newProduct = new Product({
      title,
      description,
      price,
      category,
      images,
      sellerEmail,
      sellerContact,
      seller: req.user.id // Pulled safely from our Auth Middleware payload
    });

    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(500).json({ message: 'Failed to create product listing.', error: error.message });
  }
};

// 2. GET ALL PRODUCTS (With optimized pagination & text search)
exports.getProducts = async (req, res) => {
  try {
    const { search, category, seller, page = 1, limit = 10 } = req.query;
    const useLocalStore = req.app.get('useLocalStore');

    if (useLocalStore) {
      const result = await localStore.listProducts({
        search,
        category,
        seller,
        page,
        limit,
        availableOnly: !seller,
      });

      return res.status(200).json(result);
    }

    let query = {};

    // If searching specific seller (My Listings)
    if (seller) {
      query.seller = seller;
    } else {
      query.status = 'Available'; // Public marketplace: only show available items
    }

    // If searching text
    if (search) {
      query.$text = { $search: search };
    }

    // If filtering by specific category
    if (category) {
      query.category = category;
    }

    // Pagination calculations
    const skip = (page - 1) * limit;

    const products = await Product.find(query)
      .select('title price images category status description seller sellerEmail sellerContact createdAt') // Included seller contact details
      .populate('seller', 'name email') // Populate seller details
      .skip(skip)
      .limit(parseInt(limit))
      .sort(search ? { score: { $meta: 'textScore' } } : { createdAt: -1 });

    const total = await Product.countDocuments(query);

    res.status(200).json({
      products,
      totalPages: Math.ceil(total / limit),
      currentPage: parseInt(page)
    });
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving products.', error: error.message });
  }
};

// 3. UPDATE PRODUCT STATUS (Protected)
exports.updateProductStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const useLocalStore = req.app.get('useLocalStore');
    if (!['Available', 'Pending', 'Sold'].includes(status)) {
      return res.status(400).json({ message: 'Invalid status value.' });
    }

    if (useLocalStore) {
      const product = await localStore.findProductById(req.params.id);
      if (!product) {
        return res.status(404).json({ message: 'Product not found.' });
      }

      if (String(product.seller) !== String(req.user.id)) {
        return res.status(403).json({ message: 'Not authorized to modify this listing.' });
      }

      const updatedProduct = await localStore.updateProduct(req.params.id, { status });
      return res.status(200).json(updatedProduct);
    }

    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found.' });
    }

    // Verify ownership
    if (product.seller.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized to modify this listing.' });
    }

    product.status = status;
    await product.save();

    // Populate seller for response consistency
    const populatedProduct = await Product.findById(product._id).populate('seller', 'name email');
    res.status(200).json(populatedProduct);
  } catch (error) {
    res.status(500).json({ message: 'Failed to update product status.', error: error.message });
  }
};

// 4. DELETE PRODUCT (Protected)
exports.deleteProduct = async (req, res) => {
  try {
    const useLocalStore = req.app.get('useLocalStore');

    if (useLocalStore) {
      const product = await localStore.findProductById(req.params.id);
      if (!product) {
        return res.status(404).json({ message: 'Product not found.' });
      }

      if (String(product.seller) !== String(req.user.id)) {
        return res.status(403).json({ message: 'Not authorized to delete this listing.' });
      }

      await localStore.deleteProduct(req.params.id);
      return res.status(200).json({ message: 'Product listing deleted successfully.' });
    }

    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found.' });
    }

    // Verify ownership
    if (product.seller.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized to delete this listing.' });
    }

    await Product.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Product listing deleted successfully.' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete product listing.', error: error.message });
  }
};