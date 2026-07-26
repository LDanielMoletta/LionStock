const express = require('express');
const router = express.Router();
const { success } = require('../utils/response');
const healthController = require('../controllers/health.controller');
const userRoutes = require('./user.routes');
const categoryRoutes = require('./category.routes');
const supplierRoutes = require('./supplier.routes');
const productRoutes = require('./product.routes');
const movementRoutes = require('./movement.routes');

router.get('/', (req, res) => {
  success(res, 200, 'LionStock API', {
    project: 'LionStock API',
    status: 'running',
  });
});

router.get('/health', healthController.checkHealth);

// mount auth & user routes under /api
router.use('/api', userRoutes);
router.use('/api', categoryRoutes);
router.use('/api', supplierRoutes);
router.use('/api', productRoutes);
router.use('/api', movementRoutes);

module.exports = router;
