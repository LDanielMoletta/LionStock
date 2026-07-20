const express = require('express');
const router = express.Router();
const healthController = require('../controllers/health.controller');

router.get('/', (req, res) => {
  res.json({
    project: 'LionStock API',
    status: 'running',
  });
});

router.get('/health', healthController.checkHealth);

module.exports = router;
