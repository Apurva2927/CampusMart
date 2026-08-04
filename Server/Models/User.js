const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: true, 
    trim: true 
  },
  email: { 
    type: String, 
    required: true, 
    unique: true, 
    lowercase: true,
  },
  password: { 
    type: String, 
    required: true, 
    minlength: 6 
  },
  createdAt: { 
    type: Date, 
    default: Date.now 
  }
});

// Optimization: Index email for blazing fast login lookups
userSchema.index({ email: 1 });

module.exports = mongoose.model('User', userSchema);