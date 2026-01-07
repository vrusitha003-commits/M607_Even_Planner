const express = require('express');
const router = express.Router();
const Event = require('../models/Event');
const Booking = require('../models/Booking');
const User = require('../models/User');
const bcrypt = require('bcryptjs'); 

// Home Page 
router.get('/', async (req, res) => {
  let query = {};
  
  // If user searched for something
  if (req.query.search) {
    query = {
      // Search in Title OR Description (Case insensitive)
      $or: [
        { title: { $regex: req.query.search, $options: 'i' } },
        { description: { $regex: req.query.search, $options: 'i' } }
      ]
    };
  }

  const events = await Event.find(query);
  res.render('index', { events, search: req.query.search });
});

// Event Details 
router.get('/event/:id', async (req, res) => {
  const event = await Event.findById(req.params.id);
  res.render('event-details', { 
    event, 
    mapKey: process.env.GOOGLE_MAPS_API_KEY 
  });
});

// Process Booking
router.post('/book/:id', async (req, res) => {
  if (!req.session.user) return res.redirect('/auth/login');

  try {
    await Booking.create({
      user: req.session.user._id,
      event: req.params.id
    });
    res.redirect('/dashboard');
  } catch (err) {
    console.error(err);
    res.send("Booking failed.");
  }
});

// User Dashboard 
router.get('/dashboard', async (req, res) => {
  if (!req.session.user) return res.redirect('/auth/login');

  const bookings = await Booking.find({ user: req.session.user._id })
                                .populate('event');

  res.render('user-dashboard', { bookings });
});

// Profile Update Logic
router.post('/profile/update', async (req, res) => {
    if (!req.session.user) return res.redirect('/auth/login');

    try {
        const { username, newPassword } = req.body;
        const user = await User.findById(req.session.user._id);

        // Update Username
        user.username = username;

        // Update Password ONLY if the user typed something new
        if (newPassword && newPassword.trim() !== "") {
            // Hash the new password before saving
            user.password = await bcrypt.hash(newPassword, 10);
        }

        await user.save();

        // Update the session so the new username shows in the Navbar immediately
        req.session.user = user;

        res.redirect('/dashboard');
    } catch (err) {
        console.error(err);
        res.send("Error updating profile. Username might already be taken.");
    }
});

module.exports = router;