const productService = require('../services/product.service');
const { success, error } = require('../utils/response');
const httpStatus = require('../constants/httpStatus');
const messages = require('../constants/messages');

const create = async (req, res) => {
  try {
    const product = await productService.createProduct(req.body);
    return success(res, httpStatus.CREATED, messages.PRODUCT_CREATED, product);
  } catch (err) {
    const status = err.statusCode || httpStatus.INTERNAL_SERVER_ERROR;
    return error(res, status, err.message || messages.INTERNAL_ERROR);
  }
};

const findAll = async (req, res) => {
  try {
    const products = await productService.findAll();
    return success(res, httpStatus.OK, 'Produtos listados com sucesso.', products);
  } catch (err) {
    const status = err.statusCode || httpStatus.INTERNAL_SERVER_ERROR;
    return error(res, status, err.message || messages.INTERNAL_ERROR);
  }
};

const findOne = async (req, res) => {
  try {
    const product = await productService.findById(req.params.id);
    return success(res, httpStatus.OK, 'Produto obtido com sucesso.', product);
  } catch (err) {
    const status = err.statusCode || httpStatus.INTERNAL_SERVER_ERROR;
    return error(res, status, err.message || messages.INTERNAL_ERROR);
  }
};

const update = async (req, res) => {
  try {
    const product = await productService.updateProduct(req.params.id, req.body);
    return success(res, httpStatus.OK, messages.PRODUCT_UPDATED, product);
  } catch (err) {
    const status = err.statusCode || httpStatus.INTERNAL_SERVER_ERROR;
    return error(res, status, err.message || messages.INTERNAL_ERROR);
  }
};

const remove = async (req, res) => {
  try {
    const product = await productService.deleteProduct(req.params.id);
    return success(res, httpStatus.OK, messages.PRODUCT_DELETED, product);
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
