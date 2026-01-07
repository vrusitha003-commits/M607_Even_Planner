const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Register Page
router.get('/register', (req, res) => res.render('register'));

// Register Logic
router.post('/register', async (req, res) => {
  try {
    const { username, password } = req.body;
    await User.create({ username, password });
    res.redirect('/auth/login');
  } catch (err) {
    res.send('Error creating user');
  }
});

// Login Page
router.get('/login', (req, res) => res.render('login'));

// Login Logic
router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  
  if (user && (await user.matchPassword(password))) {
    req.session.user = user; // Set session
    res.redirect('/');
  } else {
    res.send('Invalid credentials');
  }
});

// Logout
router.get('/logout', (req, res) => {
  req.session.destroy(() => res.redirect('/'));
});

module.exports = router;