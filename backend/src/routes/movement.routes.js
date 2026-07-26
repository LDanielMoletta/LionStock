const express = require('express');
const router = express.Router();
const movementController = require('../controllers/movement.controller');
const authMiddleware = require('../middlewares/auth.middleware');
const roleMiddleware = require('../middlewares/role.middleware');
const { error } = require('../utils/response');
const httpStatus = require('../constants/httpStatus');

router.post('/movements', authMiddleware, roleMiddleware(['admin', 'operator']), async (req, res, next) => {
  if (!req.body || !req.body.type || !req.body.product || !req.body.quantity) {
    return error(res, httpStatus.BAD_REQUEST, 'Validação falhou.', [
      { field: 'type', message: 'Tipo é obrigatório.' },
      { field: 'product', message: 'Produto é obrigatório.' },
      { field: 'quantity', message: 'Quantidade é obrigatória.' },
    ]);
  }
  return movementController.create(req, res, next);
});

router.get('/movements', authMiddleware, roleMiddleware(['admin', 'operator', 'viewer']), movementController.findAll);
router.get('/movements/:id', authMiddleware, roleMiddleware(['admin', 'operator', 'viewer']), movementController.findOne);

module.exports = router;
