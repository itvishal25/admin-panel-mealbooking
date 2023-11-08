const express = require('express');
const router = express.Router();
const Booking = require('../models/nonEmpBooking');

// Add New Booking: Non-Employees
router.post('/nonemployees', async (req, res) => {
  try {
    const { dates, count, notes } = req.body;
    const booking = new Booking({ dates, count, notes });
    await booking.save();
    res.json(booking);
  } catch (err) {
    res.status(500).json({ error: 'Failed to create booking' });
  }
});

// Add New Booking: Custom
router.post('/custom', async (req, res) => {
  try {
    const { dates, category, count, notes } = req.body;
    const booking = new Booking({ dates, category, count, notes });
    await booking.save();
    res.json(booking);
  } catch (err) {
    res.status(500).json({ error: 'Failed to create booking' });
  }
});

module.exports = router;
