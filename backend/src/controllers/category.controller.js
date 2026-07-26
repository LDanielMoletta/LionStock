const categoryService = require('../services/category.service');
const { success, error } = require('../utils/response');
const httpStatus = require('../constants/httpStatus');
const messages = require('../constants/messages');

const create = async (req, res) => {
  try {
    const category = await categoryService.createCategory(req.body);
    return success(res, httpStatus.CREATED, messages.CATEGORY_CREATED, category);
  } catch (err) {
    const status = err.statusCode || httpStatus.INTERNAL_SERVER_ERROR;
    return error(res, status, err.message || messages.INTERNAL_ERROR);
  }
};

const findAll = async (req, res) => {
  try {
    const categories = await categoryService.findAll();
    return success(res, httpStatus.OK, 'Categorias listadas com sucesso.', categories);
  } catch (err) {
    const status = err.statusCode || httpStatus.INTERNAL_SERVER_ERROR;
    return error(res, status, err.message || messages.INTERNAL_ERROR);
  }
};

const findOne = async (req, res) => {
  try {
    const category = await categoryService.findById(req.params.id);
    return success(res, httpStatus.OK, 'Categoria obtida com sucesso.', category);
  } catch (err) {
    const status = err.statusCode || httpStatus.INTERNAL_SERVER_ERROR;
    return error(res, status, err.message || messages.INTERNAL_ERROR);
  }
};

const update = async (req, res) => {
  try {
    const category = await categoryService.updateCategory(req.params.id, req.body);
    return success(res, httpStatus.OK, messages.CATEGORY_UPDATED, category);
  } catch (err) {
    const status = err.statusCode || httpStatus.INTERNAL_SERVER_ERROR;
    return error(res, status, err.message || messages.INTERNAL_ERROR);
  }
};

const remove = async (req, res) => {
  try {
    const category = await categoryService.deleteCategory(req.params.id);
    return success(res, httpStatus.OK, messages.CATEGORY_DELETED, category);
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
