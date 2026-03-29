const mongoose = require('mongoose');

const testimonialSchema = new mongoose.Schema({
  name: { type: String, required: true },
  review: { type: String, required: true },
  rating: { type: Number, min: 1, max: 5 },
  photo: String,
  tripType: { type: String, enum: ['Holiday', 'Business', 'Family', 'Couple', 'Solo'] },
  daysStayed: { type: Number, min: 1 },
}, { timestamps: true });

module.exports = mongoose.model('Testimonial', testimonialSchema);