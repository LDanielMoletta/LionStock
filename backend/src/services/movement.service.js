const Movement = require('../models/movement.model');
const Product = require('../models/product.model');
const User = require('../models/user.model');

class MovementService {
  async createMovement(data) {
    const quantity = typeof data.quantity === 'number' ? data.quantity : Number(data.quantity);
    if (!data.product) throw { statusCode: 400, message: 'Produto é obrigatório.' };
    if (!data.user) throw { statusCode: 400, message: 'Usuário é obrigatório.' };
    if (!['ENTRY', 'EXIT'].includes(data.type)) throw { statusCode: 400, message: 'Tipo de movimentação inválido.' };
    if (!Number.isFinite(quantity) || quantity <= 0) throw { statusCode: 400, message: 'Quantidade deve ser maior que zero.' };

    const product = await Product.findById(data.product);
    if (!product) throw { statusCode: 404, message: 'Produto não encontrado.' };

    const user = await User.findById(data.user);
    if (!user) throw { statusCode: 404, message: 'Usuário não encontrado.' };

    if (data.type === 'EXIT' && product.quantity < quantity) {
      throw { statusCode: 400, message: 'Estoque insuficiente para esta saída.' };
    }

    const movement = new Movement({
      product: product._id,
      type: data.type,
      quantity,
      reason: data.reason || '',
      user: user._id,
    });

    await movement.save();

    if (data.type === 'ENTRY') {
      product.quantity += quantity;
    } else {
      product.quantity -= quantity;
    }

    await product.save();
    return movement.populate(['product', 'user']);
  }

  async findAll() {
    return Movement.find().populate(['product', 'user']).sort({ createdAt: -1 });
  }

  async findById(id) {
    const movement = await Movement.findById(id).populate(['product', 'user']);
    if (!movement) throw { statusCode: 404, message: 'Movimentação não encontrada.' };
    return movement;
  }
}

module.exports = new MovementService();
