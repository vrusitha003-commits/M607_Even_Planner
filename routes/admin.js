const express = require('express');
const router = express.Router();
const Event = require('../models/Event');

// Middleware to protect admin routes
const ensureAdmin = (req, res, next) => {
  if (req.session.user && req.session.user.role === 'admin') return next();
  res.redirect('/auth/login');
};

router.use(ensureAdmin);

// Dashboard: List all events
router.get('/', async (req, res) => {
  const events = await Event.find({});
  res.render('admin/dashboard', { events });
});

// Create Event Logic
router.post('/create', async (req, res) => {
  await Event.create(req.body);
  res.redirect('/admin');
});

// Delete Event
router.delete('/:id', async (req, res) => {
  await Event.findByIdAndDelete(req.params.id);
  res.redirect('/admin');
});

module.exports = router;