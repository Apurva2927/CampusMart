const express = require('express');
const router = express.Router();
const { createProduct, getProducts, updateProductStatus, deleteProduct } = require('../controllers/productController');
const protect = require('../middleware/authMiddleware');

// Public Route: Anyone logged in or out can browse listings
router.get('/', getProducts);

// Protected Route: Must have valid JWT to post an item
router.post('/', protect, createProduct);

// Protected Routes: Must have valid JWT and ownership to modify/delete
router.patch('/:id/status', protect, updateProductStatus);
router.delete('/:id', protect, deleteProduct);

module.exports = router;