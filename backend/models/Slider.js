const mongoose = require('mongoose');

const sliderSchema = new mongoose.Schema({
  imageUrl: { type: String, required: true },
  title: String,
  subtitle: String,
  order: { type: Number, default: 0 }
}, { timestamps: true });

module.exports = mongoose.model('Slider', sliderSchema);