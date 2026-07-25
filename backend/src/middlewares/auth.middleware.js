const jwt = require('jsonwebtoken');
const { error } = require('../utils/response');
const httpStatus = require('../constants/httpStatus');

const JWT_SECRET = process.env.JWT_SECRET || 'change_this_secret';

module.exports = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return error(res, httpStatus.UNAUTHORIZED, 'Token não fornecido.');
    }

    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    return next();
  } catch (err) {
    return error(res, httpStatus.UNAUTHORIZED, 'Token inválido.');
  }
};
