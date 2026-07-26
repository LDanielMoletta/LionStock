const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/category.controller');
const authMiddleware = require('../middlewares/auth.middleware');
const roleMiddleware = require('../middlewares/role.middleware');
const { validateCreate, validateUpdate } = require('../validators/category.validator');
const { error } = require('../utils/response');
const httpStatus = require('../constants/httpStatus');

router.post('/categories', authMiddleware, roleMiddleware(['admin', 'operator']), async (req, res, next) => {
  const errs = validateCreate(req.body);
  if (errs.length) return error(res, httpStatus.BAD_REQUEST, 'Validação falhou.', errs);
  return categoryController.create(req, res, next);
});

router.get('/categories', authMiddleware, roleMiddleware(['admin', 'operator', 'viewer']), categoryController.findAll);
router.get('/categories/:id', authMiddleware, roleMiddleware(['admin', 'operator', 'viewer']), categoryController.findOne);

router.put('/categories/:id', authMiddleware, roleMiddleware(['admin', 'operator']), async (req, res, next) => {
  const errs = validateUpdate(req.body);
  if (errs.length) return error(res, httpStatus.BAD_REQUEST, 'Validação falhou.', errs);
  return categoryController.update(req, res, next);
});

router.delete('/categories/:id', authMiddleware, roleMiddleware(['admin']), categoryController.remove);

module.exports = router;
