const { error } = require('../utils/response');
const httpStatus = require('../constants/httpStatus');

module.exports = (allowedRoles = []) => (req, res, next) => {
  try {
    const user = req.user;
    if (!user || !user.role) return error(res, httpStatus.FORBIDDEN, 'Acesso negado.');
    if (!allowedRoles.includes(user.role)) return error(res, httpStatus.FORBIDDEN, 'Acesso negado.');
    return next();
  } catch (err) {
    return error(res, httpStatus.FORBIDDEN, 'Acesso negado.');
  }
};
