const { error } = require('../utils/response');
const messages = require('../constants/messages');

const notFound = (req, res, next) => {
  error(res, 404, messages.RESOURCE_NOT_FOUND, [messages.RESOURCE_NOT_FOUND]);
};

module.exports = notFound;
