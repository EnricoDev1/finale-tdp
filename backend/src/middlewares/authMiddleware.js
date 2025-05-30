import jwt from 'jsonwebtoken';

export const authenticateToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) return res.sendStatus(401);

  jwt.verify(token, process.env.SECRET, (err, user) => {
    if (err) {
      return res.sendStatus(403);
    }
    req.user = user;
    console.log(user);
    next();
  });
};

export const requireAdmin = (req, res, next) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Permission denied' });
  }
  next();
};

export const requireWriter = (req, res, next) => {
    if (req.user.role !== 'writer' && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Permission denied' });
    }
    next();
  };
