const userService = require('../services/user.service');
const { success, error } = require('../utils/response');
const httpStatus = require('../constants/httpStatus');

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return error(res, httpStatus.BAD_REQUEST, 'E-mail e senha são obrigatórios.');
    }

    const user = await userService.findByEmail(email);
    if (!user || !user.active) {
      return error(res, httpStatus.UNAUTHORIZED, 'Credenciais inválidas.');
    }

    const valid = await userService.validatePassword(user, password);
    if (!valid) {
      return error(res, httpStatus.UNAUTHORIZED, 'Credenciais inválidas.');
    }

    const token = userService.generateToken(user);
    const userObj = user.toObject();
    delete userObj.password;

    return success(res, httpStatus.OK, 'Login efetuado com sucesso.', { token, user: userObj });
  } catch (err) {
    const status = err.statusCode || httpStatus.INTERNAL_SERVER_ERROR;
    return error(res, status, err.message || 'Erro interno do servidor.');
  }
};

module.exports = {
  login,
};
