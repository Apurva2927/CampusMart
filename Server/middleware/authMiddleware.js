const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
  // Get token from header (usually sent as 'Authorization: Bearer <token>')
  const authHeader = req.header('Authorization');
  
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'No token, authorization denied' });
  }

  // Extract the token string
  const token = authHeader.split(' ')[1];

  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Add user payload from token to request object
    req.user = decoded;
    next(); // Move to the next controller function
  } catch (err) {
    res.status(401).json({ message: 'Token is not valid' });
  }
};