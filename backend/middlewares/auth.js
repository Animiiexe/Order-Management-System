const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const authHeader = req.headers.authorization || req.cookies?.token;
  const token = authHeader && authHeader.startsWith('Bearer ') ? authHeader.split(' ')[1] : authHeader;
  if (!token) return res.status(401).json({ message: 'No token, unauthorized' });

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.admin = payload; // contains id, email
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Token invalid' });
  }
};
