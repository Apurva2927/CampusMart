const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  category: { type: String, required: true },
  images: [{ type: String }], // Array of image URLs
  sellerEmail: { type: String, required: true, trim: true },
  sellerContact: { type: String, required: true, trim: true },
  status: { 
    type: String, 
    enum: ['Available', 'Pending', 'Sold'], 
    default: 'Available' 
  },
  seller: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },
  createdAt: { type: Date, default: Date.now }
});

// Optimization 1: Compound index for filtering available products by category
productSchema.index({ category: 1, status: 1 });

// Optimization 2: Text index for the marketplace search bar functionality
productSchema.index({ title: 'text', description: 'text' });

module.exports = mongoose.model('Product', productSchema);