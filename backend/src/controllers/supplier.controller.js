const supplierService = require('../services/supplier.service');
const { success, error } = require('../utils/response');
const httpStatus = require('../constants/httpStatus');
const messages = require('../constants/messages');

const create = async (req, res) => {
  try {
    const supplier = await supplierService.createSupplier(req.body);
    return success(res, httpStatus.CREATED, 'Fornecedor criado com sucesso.', supplier);
  } catch (err) {
    const status = err.statusCode || httpStatus.INTERNAL_SERVER_ERROR;
    return error(res, status, err.message || messages.INTERNAL_ERROR);
  }
};

const findAll = async (req, res) => {
  try {
    const suppliers = await supplierService.findAll();
    return success(res, httpStatus.OK, 'Fornecedores listados com sucesso.', suppliers);
  } catch (err) {
    const status = err.statusCode || httpStatus.INTERNAL_SERVER_ERROR;
    return error(res, status, err.message || messages.INTERNAL_ERROR);
  }
};

const findOne = async (req, res) => {
  try {
    const supplier = await supplierService.findById(req.params.id);
    return success(res, httpStatus.OK, 'Fornecedor obtido com sucesso.', supplier);
  } catch (err) {
    const status = err.statusCode || httpStatus.INTERNAL_SERVER_ERROR;
    return error(res, status, err.message || messages.INTERNAL_ERROR);
  }
};

const update = async (req, res) => {
  try {
    const supplier = await supplierService.updateSupplier(req.params.id, req.body);
    return success(res, httpStatus.OK, 'Fornecedor atualizado com sucesso.', supplier);
  } catch (err) {
    const status = err.statusCode || httpStatus.INTERNAL_SERVER_ERROR;
    return error(res, status, err.message || messages.INTERNAL_ERROR);
  }
};

const remove = async (req, res) => {
  try {
    const supplier = await supplierService.deleteSupplier(req.params.id);
    return success(res, httpStatus.OK, 'Fornecedor removido com sucesso.', supplier);
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
