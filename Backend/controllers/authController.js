const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

exports.register = async (req, res) => {
  try {
    const { email, password, userType, profileId } = req.body;

    // Check if user already exists
    let user = await User.findOne({ email, userType });
    if (user) {
      return res.status(400).json({ error: 'User already exists' });
    }

    // Create new user
    user = new User({
      email,
      password: await bcrypt.hash(password, 10), // Hash the password
      userType,
      profileId
    });

    await user.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password, userType } = req.body;

    // Find the user by email
    const user = await User.findOne({ email, userType });
    if (!user) {
      
      return res.status(400).json({ error: 'Invalid email', email });
    }

    // Check if password matches
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: 'Invalid password' });
    }

    // Generate JWT
    const token = jwt.sign({ email: user.email, userType: user.userType }, 'abcdefg', { expiresIn: '10h' });
    res.json({ token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
