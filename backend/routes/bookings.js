const express = require('express');
const router = express.Router();
const Booking = require('../models/Booking');
const Room = require('../models/Room');

// Check room availability
router.post('/check-availability', async (req, res) => {
  try {
    const { roomId, checkIn, checkOut } = req.body;
    const conflict = await Booking.findOne({
      room: roomId,
      status: { $ne: 'cancelled' },
      $or: [
        { checkIn: { $lt: new Date(checkOut) }, checkOut: { $gt: new Date(checkIn) } }
      ]
    });
    res.json({ available: !conflict });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Create booking with inventory check
router.post('/', async (req, res) => {
  try {
    const room = await Room.findById(req.body.room);
    if (!room) return res.status(404).json({ error: 'Room not found' });

    const remaining = room.totalRooms - room.bookedRooms;
    if (remaining <= 0) {
      return res.status(400).json({ error: 'No rooms available for this type' });
    }

    const booking = new Booking(req.body);
    await booking.save();

    // Auto reduce inventory
    room.bookedRooms += 1;
    await room.save();

    res.status(201).json(booking);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all bookings (admin)
router.get('/', async (req, res) => {
  try {
    const { status, guest, checkIn, checkOut } = req.query;
    const filter = {};

    if (status) filter.status = status;
    if (guest) filter.guestName = { $regex: guest, $options: 'i' };
    if (checkIn) filter.checkIn = { $gte: new Date(checkIn) };
    if (checkOut) filter.checkOut = { $lte: new Date(checkOut) };

    const bookings = await Booking.find(filter).populate('room');
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;