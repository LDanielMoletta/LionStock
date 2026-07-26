const movementService = require('../services/movement.service');
const { success, error } = require('../utils/response');
const httpStatus = require('../constants/httpStatus');
const messages = require('../constants/messages');

const create = async (req, res) => {
  try {
    const payload = {
      ...req.body,
      user: req.user && req.user.id ? req.user.id : req.body.user,
    };
    const movement = await movementService.createMovement(payload);
    return success(res, httpStatus.CREATED, 'Movimentação registrada com sucesso.', movement);
  } catch (err) {
    const status = err.statusCode || httpStatus.INTERNAL_SERVER_ERROR;
    return error(res, status, err.message || messages.INTERNAL_ERROR);
  }
};

const findAll = async (req, res) => {
  try {
    const movements = await movementService.findAll();
    return success(res, httpStatus.OK, 'Movimentações listadas com sucesso.', movements);
  } catch (err) {
    const status = err.statusCode || httpStatus.INTERNAL_SERVER_ERROR;
    return error(res, status, err.message || messages.INTERNAL_ERROR);
  }
};

const findOne = async (req, res) => {
  try {
    const movement = await movementService.findById(req.params.id);
    return success(res, httpStatus.OK, 'Movimentação obtida com sucesso.', movement);
  } catch (err) {
    const status = err.statusCode || httpStatus.INTERNAL_SERVER_ERROR;
    return error(res, status, err.message || messages.INTERNAL_ERROR);
  }
};

module.exports = {
  create,
  findAll,
  findOne,
};
