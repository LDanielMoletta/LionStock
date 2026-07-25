const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const path = require('path');
const { error } = require('../utils/response');
const httpStatus = require('../constants/httpStatus');

dotenv.config({
  path: path.resolve(__dirname, '../../.env')
});

const JWT_SECRET = process.env.JWT_SECRET;

module.exports = (req, res, next) => {
  try {
    if (!JWT_SECRET) {
      return error(res, httpStatus.INTERNAL_SERVER_ERROR, 'JWT_SECRET não configurado no ambiente.');
    }

    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return error(res, httpStatus.UNAUTHORIZED, 'Token não fornecido.');
    }

    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    return next();
  } catch (err) {
    if (err.name === 'TokenExpiredError') {
      return error(res, httpStatus.UNAUTHORIZED, 'Token expirado.');
    }
    return error(res, httpStatus.UNAUTHORIZED, 'Token inválido.');
  }
};
