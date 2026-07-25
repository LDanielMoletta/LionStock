const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');
const authController = require('../controllers/auth.controller');
const authMiddleware = require('../middlewares/auth.middleware');
const roleMiddleware = require('../middlewares/role.middleware');
const { validateCreate, validateUpdate } = require('../validators/user.validator');
const { error } = require('../utils/response');
const httpStatus = require('../constants/httpStatus');

// Auth
router.post('/auth/login', authController.login);

// Users
router.post('/users', authMiddleware, roleMiddleware(['admin']), async (req, res, next) => {
  const errs = validateCreate(req.body);
  if (errs.length) return error(res, httpStatus.BAD_REQUEST, 'Validação falhou.', errs);
  return userController.create(req, res, next);
});

router.get('/users', authMiddleware, roleMiddleware(['admin', 'operator']), userController.findAll);
router.get('/users/:id', authMiddleware, roleMiddleware(['admin', 'operator', 'viewer']), userController.findOne);

router.put('/users/:id', authMiddleware, roleMiddleware(['admin', 'operator']), async (req, res, next) => {
  const errs = validateUpdate(req.body);
  if (errs.length) return error(res, httpStatus.BAD_REQUEST, 'Validação falhou.', errs);
  return userController.update(req, res, next);
});

router.delete('/users/:id', authMiddleware, roleMiddleware(['admin']), userController.remove);

module.exports = router;
