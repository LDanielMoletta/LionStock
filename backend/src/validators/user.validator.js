const isEmail = (email) => /\S+@\S+\.\S+/.test(email);

const validateCreate = (body) => {
  const errors = [];
  if (!body.name) errors.push({ field: 'name', message: 'Nome é obrigatório.' });
  if (!body.email) errors.push({ field: 'email', message: 'E-mail é obrigatório.' });
  else if (!isEmail(body.email)) errors.push({ field: 'email', message: 'E-mail inválido.' });
  if (!body.password) errors.push({ field: 'password', message: 'Senha é obrigatória.' });
  if (body.role && !['admin', 'operator', 'viewer'].includes(body.role)) {
    errors.push({ field: 'role', message: 'Perfil inválido.' });
  }
  return errors;
};

const validateUpdate = (body) => {
  const errors = [];
  if (body.email && !isEmail(body.email)) errors.push({ field: 'email', message: 'E-mail inválido.' });
  if (body.role && !['admin', 'operator', 'viewer'].includes(body.role)) errors.push({ field: 'role', message: 'Perfil inválido.' });
  return errors;
};

module.exports = {
  validateCreate,
  validateUpdate,
};
