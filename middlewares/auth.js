const jwt = require('jsonwebtoken');

const { JWT_SECRET = 'SECRET_KEY' } = process.env;
const Unauthorized = require('../utils/errors/Unauthorized');

const auth = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith('Bearer ')) {
    return next(new Unauthorized('Необходима авторизация'));
  }
  const token = authorization.replace('Bearer ', '');
  let payload;
  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch (error) {
    return next(new Unauthorized('Необходима авторизация'));
  }
  req.user = payload;
  return next();
};

module.exports = {
  auth,
  JWT_SECRET,
};
