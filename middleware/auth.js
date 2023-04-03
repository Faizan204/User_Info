const jwt = require('jsonwebtoken');
const User = require('../models/user');

module.exports = async (req, res, next) => {
  try {
    // Get the token from the authorization header
    const token = req.headers.authorization.split(' ')[1];

    // Decode the token to get the user ID
    const decodedToken = jwt.verify(token, 'secret');
    req.userId = decodedToken.id;

    // Find the user in the database
    const user = await User.findById(req.userId);

    // If the user doesn't exist, return an error message
    if (!user) {
      return res.status(400).json({ message: 'User not found.' });
    }

    // Call the next middleware function
    next();
  } catch {
    // If an error occurs, return an error message
    res.status(401).json({ message: 'Invalid token.' });
  }
};
