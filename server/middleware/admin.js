const isAdmin = (req, res, next) => {
  const { role } = req.body;

  if (role === 'admin') {
    return next();
  } else {
    return res.status(403).json({ message: 'Permission denied' });
  }
};

module.exports = { isAdmin };
