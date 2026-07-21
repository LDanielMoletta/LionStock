const { success, error } = require('../utils/response');
const messages = require('../constants/messages');

const checkHealth = (req, res) => {
  try {
    success(res, 200, messages.API_RUNNING, {
      timestamp: new Date().toISOString(),
    });
  } catch (err) {
    error(res, 500, messages.INTERNAL_ERROR, [err.message]);
  }
};

module.exports = {
  checkHealth,
};
