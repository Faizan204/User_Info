const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
  try {
    // Hash the password using bcrypt
    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    // Create a new user with the hashed password
    const user = new User({
      username: req.body.username,
  email:req.body.email,
      password: hashedPassword,
    });

    // Save the user to the database
    await user.save();

    // Generate a token for the user
    const token = jwt.sign({ id: user._id }, 'secret');

    // Return the token
    res.json("User Registered Successfully");
  } catch {
    // If an error occurs, return an error message
    res.status(500).send('An error occurred while registering the user.');
  }
};

exports.login = async (req, res) => {
  try {
    // Find the user in the database
    const user = await User.findOne({ username: req.body.username });

    // If the user doesn't exist, return an error message
    if (!user) {
      return res.status(400).json({ message: 'User not found.' });
    }

    // Check if the password is correct
    const isPasswordValid = await bcrypt.compare(
      req.body.password,
      user.password
    );

    // If the password is incorrect, return an
    if (!isPasswordValid) {
        return res.status(400).json({ message: 'Invalid password.' });
      }
  
      // Generate a token for the user
      const token = jwt.sign({ id: user._id }, 'secret');
  
      // Return the token
      res.json({ token });
    } catch {
      // If an error occurs, return an error message
      res.status(500).send('An error occurred while logging in.');
    }
  };
  
  exports.getProfile = async (req, res) => {
    try {
      // Find the user in the database
      const user = await User.findById(req.userId);
  
      // If the user doesn't exist, return an error message
      if (!user) {
        return res.status(400).json({ message: 'User not found.' });
      }
  
      // Return the user's profile
      res.json( user );
    } catch {
      // If an error occurs, return an error message
      res.status(500).send('An error occurred while getting the user profile.');
    }
  };
  