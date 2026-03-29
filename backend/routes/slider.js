const express = require('express');
const router = express.Router();
const Slider = require('../models/Slider');

router.get('/', async (req, res) => {
  try {
    const slides = await Slider.find();
    res.json(slides);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/', async (req, res) => {
  try {
    const slide = new Slider(req.body);
    await slide.save();
    res.status(201).json(slide);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    await Slider.findByIdAndDelete(req.params.id);
    res.json({ message: 'Slide deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;