const Supplier = require('../models/supplier.model');

class SupplierService {
  async createSupplier(data) {
    const name = data.name ? data.name.trim() : '';
    if (!name) {
      throw { statusCode: 400, message: 'Nome do fornecedor é obrigatório.' };
    }

    const supplier = new Supplier({
      name,
      contactName: data.contactName || '',
      email: data.email || '',
      phone: data.phone || '',
      address: data.address || '',
      active: typeof data.active === 'boolean' ? data.active : true,
    });

    await supplier.save();
    return supplier;
  }

  async findAll() {
    return Supplier.find().sort({ createdAt: -1 });
  }

  async findById(id) {
    const supplier = await Supplier.findById(id);
    if (!supplier) {
      throw { statusCode: 404, message: 'Fornecedor não encontrado.' };
    }
    return supplier;
  }

  async updateSupplier(id, data) {
    const supplier = await Supplier.findById(id);
    if (!supplier) {
      throw { statusCode: 404, message: 'Fornecedor não encontrado.' };
    }

    if (data.name) {
      supplier.name = data.name.trim();
    }
    if (typeof data.contactName === 'string') supplier.contactName = data.contactName;
    if (typeof data.email === 'string') supplier.email = data.email;
    if (typeof data.phone === 'string') supplier.phone = data.phone;
    if (typeof data.address === 'string') supplier.address = data.address;
    if (typeof data.active === 'boolean') supplier.active = data.active;

    await supplier.save();
    return supplier;
  }

  async deleteSupplier(id) {
    const supplier = await Supplier.findByIdAndDelete(id);
    if (!supplier) {
      throw { statusCode: 404, message: 'Fornecedor não encontrado.' };
    }
    return supplier;
  }
}

module.exports = new SupplierService();
