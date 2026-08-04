const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const localStore = require('../utils/localStore');

// 1. REGISTER NEW USER
exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const useLocalStore = req.app.get('useLocalStore');

    // Check if user already exists
    const existingUser = useLocalStore
      ? await localStore.findUserByEmail(email)
      : await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists with this email.' });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    let newUser;

    if (useLocalStore) {
      newUser = await localStore.createUser({
        name,
        email,
        password: hashedPassword,
      });
    } else {
      // Create and save user
      newUser = new User({
        name,
        email,
        password: hashedPassword
      });
      await newUser.save();
    }

    // Generate JWT
    const userId = newUser._id || newUser.id;
    const token = jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: '24h' });

    res.status(201).json({
      token,
      user: { id: userId, name: newUser.name, email: newUser.email }
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error during registration.', error: error.message });
  }
};

// 2. LOGIN USER
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const useLocalStore = req.app.get('useLocalStore');

    // Check if user exists
    const user = useLocalStore
      ? await localStore.findUserByEmail(email)
      : await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid email or password.' });
    }

    // Verify password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid email or password.' });
    }

    // Generate JWT
    const userId = user._id || user.id;
    const token = jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: '24h' });

    res.status(200).json({
      token,
      user: { id: userId, name: user.name, email: user.email }
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error during login.', error: error.message });
  }
};