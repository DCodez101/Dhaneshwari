const express = require('express');
const router = express.Router();
const Amenity = require('../models/Amenity');

router.get('/', async (req, res) => {
  try {
    const amenities = await Amenity.find();
    res.json(amenities);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/', async (req, res) => {
  try {
    const amenity = await Amenity.create(req.body);
    res.status(201).json(amenity);
  } catch (err) {
    if (err.code === 11000) return res.status(400).json({ error: 'Amenity already exists' });
    res.status(500).json({ error: err.message });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const amenity = await Amenity.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(amenity);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    await Amenity.findByIdAndDelete(req.params.id);
    res.json({ message: 'Amenity deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;