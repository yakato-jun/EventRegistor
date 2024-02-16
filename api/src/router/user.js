'use strict'
const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.send('Hello, user world!');
});

router.post('/', (req, res) => {
  res.send('Hello, post user world!');
});

module.exports = router;