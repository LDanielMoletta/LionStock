const checkHealth = (req, res) => {
  res.json({
    success: true,
    message: 'API funcionando corretamente.',
  });
};

module.exports = {
  checkHealth,
};
