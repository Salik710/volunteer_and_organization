const jwt = require('jsonwebtoken');


const authMiddleware = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  if (!token) {
    return res.status(401).json({ error: 'Access denied. No token provided.' });
  }

  try {
    const decoded = jwt.verify(token, 'abcdefg');
    if(req.body.email !== decoded.email) {
      return res.status(401).json({ error: 'Access denied. Email in token does not match request email.' });
    }
    next();
  } catch (error) {
    res.status(400).json({ error: 'Invalid token'});
  }
};

module.exports = authMiddleware;
