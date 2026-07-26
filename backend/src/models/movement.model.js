const mongoose = require('mongoose');

const MovementSchema = new mongoose.Schema(
  {
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
    type: { type: String, enum: ['ENTRY', 'EXIT'], required: true },
    quantity: { type: Number, required: true },
    reason: { type: String, default: '' },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Movement', MovementSchema);
