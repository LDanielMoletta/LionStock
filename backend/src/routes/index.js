const express = require('express');
const router = express.Router();
const { success } = require('../utils/response');
const healthController = require('../controllers/health.controller');

router.get('/', (req, res) => {
  success(res, 200, 'LionStock API', {
    project: 'LionStock API',
    status: 'running',
  });
});

router.get('/health', healthController.checkHealth);

module.exports = router;
