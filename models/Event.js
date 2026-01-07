const mongoose = require('mongoose');

const EventSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  date: Date,
  locationName: String,
  // Storing coordinates for Google Maps
  lat: { type: Number, required: true },
  lng: { type: Number, required: true },
  price: Number
});

module.exports = mongoose.model('Event', EventSchema);