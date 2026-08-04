const fs = require('fs/promises');
const path = require('path');
const crypto = require('crypto');

const storePath = path.join(__dirname, '..', 'data', 'localStore.json');

const defaultStore = {
  users: [],
  products: [],
};

const ensureStore = async () => {
  try {
    await fs.access(storePath);
  } catch {
    await fs.mkdir(path.dirname(storePath), { recursive: true });
    await fs.writeFile(storePath, JSON.stringify(defaultStore, null, 2), 'utf8');
  }
};

const readStore = async () => {
  await ensureStore();
  const content = await fs.readFile(storePath, 'utf8');
  return JSON.parse(content);
};

const writeStore = async (store) => {
  await fs.mkdir(path.dirname(storePath), { recursive: true });
  await fs.writeFile(storePath, JSON.stringify(store, null, 2), 'utf8');
};

const normalizeEmail = (email) => String(email || '').trim().toLowerCase();

const publicUser = (user) => ({
  id: user.id,
  name: user.name,
  email: user.email,
});

const findUserByEmail = async (email) => {
  const store = await readStore();
  return store.users.find((user) => user.email === normalizeEmail(email)) || null;
};

const findUserById = async (id) => {
  const store = await readStore();
  return store.users.find((user) => user.id === String(id)) || null;
};

const createUser = async ({ name, email, password }) => {
  const store = await readStore();
  const user = {
    id: crypto.randomUUID(),
    name: String(name || '').trim(),
    email: normalizeEmail(email),
    password,
    createdAt: new Date().toISOString(),
  };

  store.users.push(user);
  await writeStore(store);
  return user;
};

const listProducts = async ({ search, category, seller, page = 1, limit = 10, availableOnly = true }) => {
  const store = await readStore();
  let products = [...store.products];

  if (seller) {
    products = products.filter((product) => product.seller === String(seller));
  } else if (availableOnly) {
    products = products.filter((product) => product.status === 'Available');
  }

  if (search) {
    const term = String(search).toLowerCase();
    products = products.filter((product) =>
      [product.title, product.description]
        .filter(Boolean)
        .some((value) => String(value).toLowerCase().includes(term))
    );
  }

  if (category) {
    products = products.filter((product) => product.category === category);
  }

  const pageNumber = parseInt(page, 10) || 1;
  const pageSize = parseInt(limit, 10) || 10;
  const start = (pageNumber - 1) * pageSize;
  const paginated = products.slice(start, start + pageSize);

  const usersById = new Map(store.users.map((user) => [user.id, user]));

  const shapedProducts = paginated.map((product) => {
    const sellerUser = usersById.get(product.seller);
    return {
      ...product,
      seller: sellerUser ? publicUser(sellerUser) : { id: product.seller },
    };
  });

  return {
    products: shapedProducts,
    totalPages: Math.ceil(products.length / pageSize),
    currentPage: pageNumber,
  };
};

const createProduct = async (productData) => {
  const store = await readStore();
  const product = {
    id: crypto.randomUUID(),
    title: productData.title,
    description: productData.description,
    price: Number(productData.price),
    category: productData.category,
    images: Array.isArray(productData.images) ? productData.images : [],
    sellerEmail: String(productData.sellerEmail || '').trim(),
    sellerContact: String(productData.sellerContact || '').trim(),
    status: productData.status || 'Available',
    seller: String(productData.seller),
    createdAt: new Date().toISOString(),
  };

  store.products.push(product);
  await writeStore(store);
  return product;
};

const findProductById = async (id) => {
  const store = await readStore();
  return store.products.find((product) => product.id === String(id)) || null;
};

const updateProduct = async (id, updates) => {
  const store = await readStore();
  const index = store.products.findIndex((product) => product.id === String(id));
  if (index === -1) {
    return null;
  }

  store.products[index] = {
    ...store.products[index],
    ...updates,
  };

  await writeStore(store);
  return store.products[index];
};

const deleteProduct = async (id) => {
  const store = await readStore();
  const nextProducts = store.products.filter((product) => product.id !== String(id));

  if (nextProducts.length === store.products.length) {
    return false;
  }

  store.products = nextProducts;
  await writeStore(store);
  return true;
};

module.exports = {
  findUserByEmail,
  findUserById,
  createUser,
  listProducts,
  createProduct,
  findProductById,
  updateProduct,
  deleteProduct,
  publicUser,
};