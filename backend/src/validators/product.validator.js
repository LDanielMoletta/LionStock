const validateCreate = (body) => {
  const errors = [];

  if (!body.sku || !String(body.sku).trim()) {
    errors.push({ field: 'sku', message: 'SKU é obrigatório.' });
  }
  if (!body.name || !String(body.name).trim()) {
    errors.push({ field: 'name', message: 'Nome do produto é obrigatório.' });
  }
  if (!body.category) {
    errors.push({ field: 'category', message: 'Categoria é obrigatória.' });
  }
  if (!body.supplier) {
    errors.push({ field: 'supplier', message: 'Fornecedor é obrigatório.' });
  }
  if (body.quantity !== undefined && typeof body.quantity !== 'number') {
    errors.push({ field: 'quantity', message: 'Quantidade deve ser um número.' });
  }
  if (body.unitPrice !== undefined && typeof body.unitPrice !== 'number') {
    errors.push({ field: 'unitPrice', message: 'Preço unitário deve ser um número.' });
  }

  return errors;
};

const validateUpdate = (body) => {
  const errors = [];

  if (body.sku !== undefined && !String(body.sku).trim()) {
    errors.push({ field: 'sku', message: 'SKU não pode ser vazio.' });
  }
  if (body.name !== undefined && !String(body.name).trim()) {
    errors.push({ field: 'name', message: 'Nome do produto não pode ser vazio.' });
  }
  if (body.quantity !== undefined && typeof body.quantity !== 'number') {
    errors.push({ field: 'quantity', message: 'Quantidade deve ser um número.' });
  }
  if (body.unitPrice !== undefined && typeof body.unitPrice !== 'number') {
    errors.push({ field: 'unitPrice', message: 'Preço unitário deve ser um número.' });
  }

  return errors;
};

module.exports = {
  validateCreate,
  validateUpdate,
};
