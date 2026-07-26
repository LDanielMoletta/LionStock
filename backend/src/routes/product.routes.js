const express = require('express');
const router = express.Router();
const productController = require('../controllers/product.controller');
const authMiddleware = require('../middlewares/auth.middleware');
const roleMiddleware = require('../middlewares/role.middleware');
const { validateCreate, validateUpdate } = require('../validators/product.validator');
const { error } = require('../utils/response');
const httpStatus = require('../constants/httpStatus');

router.post('/products', authMiddleware, roleMiddleware(['admin', 'operator']), async (req, res, next) => {
  const errs = validateCreate(req.body);
  if (errs.length) return error(res, httpStatus.BAD_REQUEST, 'Validação falhou.', errs);
  return productController.create(req, res, next);
});

router.get('/products', authMiddleware, roleMiddleware(['admin', 'operator', 'viewer']), productController.findAll);
router.get('/products/:id', authMiddleware, roleMiddleware(['admin', 'operator', 'viewer']), productController.findOne);

router.put('/products/:id', authMiddleware, roleMiddleware(['admin', 'operator']), async (req, res, next) => {
  const errs = validateUpdate(req.body);
  if (errs.length) return error(res, httpStatus.BAD_REQUEST, 'Validação falhou.', errs);
  return productController.update(req, res, next);
});

router.delete('/products/:id', authMiddleware, roleMiddleware(['admin']), productController.remove);

module.exports = router;
