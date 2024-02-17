'use strict'

const express = require('express');
const router = express.Router();

const auth = require('../auth');

router.post('/', (req, res, next) => {
  auth.passport.authenticate('local', (err, user, info) => {
    if (err) {
      console.log('Authentication error:', err);
      return res.status(401).json({ message: 'Login failed'});
    }
    if (!user) {
      console.log('Login failed:', info);
      return res.status(401).json({ message: 'Login failed'});
    }
    
    req.logIn(user, (err) => {
      if (err) {
        console.log('Session error:', err);
        return res.status(500).json({ message: 'Session error' });
      }
      return res.status(200).json({ message: 'Login successful', user: user.user_id });
    });
  })(req, res, next);
});

module.exports = router;