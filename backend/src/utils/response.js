const success = (res, statusCode = 200, message, data = {}) => {
  res.status(statusCode).json({
    success: true,
    message,
    data,
  });
};

const error = (res, statusCode = 500, message, errors = []) => {
  res.status(statusCode).json({
    success: false,
    message,
    errors,
  });
};

module.exports = {
  success,
  error,
};
