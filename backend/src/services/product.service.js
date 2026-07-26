const Product = require('../models/product.model');
const Category = require('../models/category.model');
const Supplier = require('../models/supplier.model');

class ProductService {
  async createProduct(data) {
    const sku = data.sku ? data.sku.trim() : '';
    const name = data.name ? data.name.trim() : '';

    if (!sku) throw { statusCode: 400, message: 'SKU é obrigatório.' };
    if (!name) throw { statusCode: 400, message: 'Nome do produto é obrigatório.' };

    const existing = await Product.findOne({ sku });
    if (existing) throw { statusCode: 409, message: 'SKU já cadastrado.' };

    const category = await Category.findById(data.category);
    if (!category) throw { statusCode: 404, message: 'Categoria não encontrada.' };

    const supplier = await Supplier.findById(data.supplier);
    if (!supplier) throw { statusCode: 404, message: 'Fornecedor não encontrado.' };

    const product = new Product({
      sku,
      name,
      description: data.description || '',
      category: category._id,
      supplier: supplier._id,
      quantity: typeof data.quantity === 'number' ? data.quantity : 0,
      unitPrice: typeof data.unitPrice === 'number' ? data.unitPrice : 0,
      active: typeof data.active === 'boolean' ? data.active : true,
    });

    await product.save();
    return product.populate(['category', 'supplier']);
  }

  async findAll() {
    return Product.find().populate(['category', 'supplier']).sort({ createdAt: -1 });
  }

  async findById(id) {
    const product = await Product.findById(id).populate(['category', 'supplier']);
    if (!product) throw { statusCode: 404, message: 'Produto não encontrado.' };
    return product;
  }

  async updateProduct(id, data) {
    const product = await Product.findById(id);
    if (!product) throw { statusCode: 404, message: 'Produto não encontrado.' };

    if (data.sku) {
      const sku = data.sku.trim();
      const existing = await Product.findOne({ sku, _id: { $ne: id } });
      if (existing) throw { statusCode: 409, message: 'SKU já cadastrado.' };
      product.sku = sku;
    }
    if (data.name) product.name = data.name.trim();
    if (typeof data.description === 'string') product.description = data.description;
    if (data.category) {
      const category = await Category.findById(data.category);
      if (!category) throw { statusCode: 404, message: 'Categoria não encontrada.' };
      product.category = category._id;
    }
    if (data.supplier) {
      const supplier = await Supplier.findById(data.supplier);
      if (!supplier) throw { statusCode: 404, message: 'Fornecedor não encontrado.' };
      product.supplier = supplier._id;
    }
    if (typeof data.quantity === 'number') product.quantity = data.quantity;
    if (typeof data.unitPrice === 'number') product.unitPrice = data.unitPrice;
    if (typeof data.active === 'boolean') product.active = data.active;

    await product.save();
    return product.populate(['category', 'supplier']);
  }

  async deleteProduct(id) {
    const product = await Product.findByIdAndDelete(id);
    if (!product) throw { statusCode: 404, message: 'Produto não encontrado.' };
    return product;
  }
}

module.exports = new ProductService();
