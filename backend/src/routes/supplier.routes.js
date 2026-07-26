const express = require('express');
const router = express.Router();
const supplierController = require('../controllers/supplier.controller');
const authMiddleware = require('../middlewares/auth.middleware');
const roleMiddleware = require('../middlewares/role.middleware');
const { validateCreate, validateUpdate } = require('../validators/supplier.validator');
const { error } = require('../utils/response');
const httpStatus = require('../constants/httpStatus');

router.post('/suppliers', authMiddleware, roleMiddleware(['admin', 'operator']), async (req, res, next) => {
  const errs = validateCreate(req.body);
  if (errs.length) return error(res, httpStatus.BAD_REQUEST, 'Validação falhou.', errs);
  return supplierController.create(req, res, next);
});

router.get('/suppliers', authMiddleware, roleMiddleware(['admin', 'operator', 'viewer']), supplierController.findAll);
router.get('/suppliers/:id', authMiddleware, roleMiddleware(['admin', 'operator', 'viewer']), supplierController.findOne);

router.put('/suppliers/:id', authMiddleware, roleMiddleware(['admin', 'operator']), async (req, res, next) => {
  const errs = validateUpdate(req.body);
  if (errs.length) return error(res, httpStatus.BAD_REQUEST, 'Validação falhou.', errs);
  return supplierController.update(req, res, next);
});

router.delete('/suppliers/:id', authMiddleware, roleMiddleware(['admin']), supplierController.remove);

module.exports = router;
