const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user.model');

const SALT_ROUNDS = parseInt(process.env.BCRYPT_SALT_ROUNDS, 10) || 10;
const JWT_SECRET = process.env.JWT_SECRET || 'change_this_secret';
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '1h';

class UserService {
  async createUser(data) {
    const existing = await User.findOne({ email: data.email.toLowerCase() });
    if (existing) {
      throw { statusCode: 409, message: 'E-mail já cadastrado.' };
    }

    const hashed = await bcrypt.hash(data.password, SALT_ROUNDS);
    const user = new User({
      name: data.name,
      email: data.email.toLowerCase(),
      password: hashed,
      role: data.role || 'viewer',
      active: typeof data.active === 'boolean' ? data.active : true,
    });

    await user.save();
    const obj = user.toObject();
    delete obj.password;
    return obj;
  }

  async findAll() {
    const users = await User.find().select('-password');
    return users;
  }

  async findById(id) {
    const user = await User.findById(id).select('-password');
    if (!user) throw { statusCode: 404, message: 'Usuário não encontrado.' };
    return user;
  }

  async updateUser(id, data) {
    const updates = { ...data };
    if (updates.password) {
      updates.password = await bcrypt.hash(updates.password, SALT_ROUNDS);
    }
    if (updates.email) updates.email = updates.email.toLowerCase();

    const user = await User.findByIdAndUpdate(id, updates, { new: true }).select('-password');
    if (!user) throw { statusCode: 404, message: 'Usuário não encontrado.' };
    return user;
  }

  async deleteUser(id) {
    const user = await User.findByIdAndDelete(id).select('-password');
    if (!user) throw { statusCode: 404, message: 'Usuário não encontrado.' };
    return user;
  }

  async findByEmail(email) {
    return User.findOne({ email: email.toLowerCase() });
  }

  async validatePassword(user, plainPassword) {
    return bcrypt.compare(plainPassword, user.password);
  }

  generateToken(user) {
    const payload = { id: user._id, role: user.role, email: user.email };
    return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
  }
}

module.exports = new UserService();
