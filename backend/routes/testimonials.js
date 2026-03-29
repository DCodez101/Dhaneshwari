const express = require('express');
const router = express.Router();
const Testimonial = require('../models/Testimonial');
const upload = require('../middleware/upload');

router.get('/', async (req, res) => {
  try {
    const testimonials = await Testimonial.find();
    res.json(testimonials);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/', async (req, res) => {
  try {
    const testimonial = new Testimonial(req.body);
    await testimonial.save();
    res.status(201).json(testimonial);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/upload-photo', upload.single('photo'), (req, res) => {
  if (!req.file) return res.status(400).json({ error: 'No file uploaded' });
  res.json({ photoUrl: `/uploads/${req.file.filename}` });
});

router.delete('/:id', async (req, res) => {
  try {
    await Testimonial.findByIdAndDelete(req.params.id);
    res.json({ message: 'Testimonial deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
router.put('/:id', async (req, res) => {
  try {
    const testimonial = await Testimonial.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(testimonial);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;