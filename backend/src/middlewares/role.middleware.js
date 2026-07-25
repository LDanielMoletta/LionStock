const { error } = require('../utils/response');
const httpStatus = require('../constants/httpStatus');

module.exports = (allowedRoles = []) => (req, res, next) => {
  try {
    const user = req.user;
    const userRole = user && user.role ? user.role.toLowerCase() : null;
    if (!userRole) return error(res, httpStatus.FORBIDDEN, 'Acesso negado.');
    if (!allowedRoles.map((role) => role.toLowerCase()).includes(userRole)) {
      return error(res, httpStatus.FORBIDDEN, 'Acesso negado.');
    }
    return next();
  } catch (err) {
    return error(res, httpStatus.FORBIDDEN, 'Acesso negado.');
  }
};
