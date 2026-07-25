const userService = require('../services/user.service');
const { success, error } = require('../utils/response');
const httpStatus = require('../constants/httpStatus');
const messages = require('../constants/messages');

const create = async (req, res) => {
  try {
    const user = await userService.createUser(req.body);
    return success(res, httpStatus.CREATED, messages.USER_CREATED, user);
  } catch (err) {
    const status = err.statusCode || httpStatus.INTERNAL_SERVER_ERROR;
    return error(res, status, err.message || messages.INTERNAL_ERROR);
  }
};

const findAll = async (req, res) => {
  try {
    const users = await userService.findAll();
    return success(res, httpStatus.OK, 'Usuários listados com sucesso.', users);
  } catch (err) {
    const status = err.statusCode || httpStatus.INTERNAL_SERVER_ERROR;
    return error(res, status, err.message || messages.INTERNAL_ERROR);
  }
};

const findOne = async (req, res) => {
  try {
    const user = await userService.findById(req.params.id);
    return success(res, httpStatus.OK, 'Usuário obtido com sucesso.', user);
  } catch (err) {
    const status = err.statusCode || httpStatus.INTERNAL_SERVER_ERROR;
    return error(res, status, err.message || messages.INTERNAL_ERROR);
  }
};

const update = async (req, res) => {
  try {
    const user = await userService.updateUser(req.params.id, req.body);
    return success(res, httpStatus.OK, messages.USER_UPDATED, user);
  } catch (err) {
    const status = err.statusCode || httpStatus.INTERNAL_SERVER_ERROR;
    return error(res, status, err.message || messages.INTERNAL_ERROR);
  }
};

const remove = async (req, res) => {
  try {
    const user = await userService.deleteUser(req.params.id);
    return success(res, httpStatus.OK, messages.USER_DELETED, user);
  } catch (err) {
    const status = err.statusCode || httpStatus.INTERNAL_SERVER_ERROR;
    return error(res, status, err.message || messages.INTERNAL_ERROR);
  }
};

module.exports = {
  create,
  findAll,
  findOne,
  update,
  remove,
};
