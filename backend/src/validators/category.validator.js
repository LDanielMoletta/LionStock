const validateCreate = (body) => {
  const errors = [];

  if (!body.name || !String(body.name).trim()) {
    errors.push({ field: 'name', message: 'Nome da categoria é obrigatório.' });
  }

  return errors;
};

const validateUpdate = (body) => {
  const errors = [];

  if (body.name !== undefined && !String(body.name).trim()) {
    errors.push({ field: 'name', message: 'Nome da categoria não pode ser vazio.' });
  }

  return errors;
};

module.exports = {
  validateCreate,
  validateUpdate,
};
