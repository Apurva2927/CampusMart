// 1. Load environment variables at the absolute top
require('dotenv').config(); 

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// Import Routes
const authRoutes = require('./routes/authRoutes');
const productRoutes = require('./routes/productRoutes'); 

const app = express();

// 2. Global Middleware
app.use(cors());
app.use(express.json()); // Parses incoming JSON requests

// 3. Mount Routes Middleware
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes); 

// Test Route to ensure server is alive
app.get('/', (req, res) => {
  res.send('CampusMart API is running smoothly.');
});

// 4. Database Connection & Server Start
const PORT = process.env.PORT || 5000;

const startServer = () => {
  app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
  });
};

const connectWithFallback = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Successfully connected to MongoDB.');
    startServer();
  } catch (error) {
    console.error('MongoDB connection error:', error.message);
    console.log('Falling back to local file storage for development.');
    app.set('useLocalStore', true);
    startServer();
  }
};

connectWithFallback();