const { error } = require('../utils/response');
const messages = require('../constants/messages');

const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || messages.INTERNAL_ERROR;

  error(res, statusCode, message, [message]);
};

module.exports = errorHandler;
