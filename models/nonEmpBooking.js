// models/booking.js
const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  dates: {
    type: [Date],
    required: true,
  },
  category: {
    type: String,
    required: true,  
  },
  count: {
    type: Number,
    required: true,
  },
  notes: String,
});

module.exports = mongoose.model('Booking', bookingSchema);
