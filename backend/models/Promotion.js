const mongoose = require('mongoose');

const promotionSchema = new mongoose.Schema({
  title: { type: String, required: true },
  discountType: { type: String, enum: ['flat', 'percentage'], required: true },
  discountValue: { type: Number, required: true },
  rooms: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Room' }],
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  isActive: { type: Boolean, default: true },
}, { timestamps: true });

module.exports = mongoose.model('Promotion', promotionSchema);