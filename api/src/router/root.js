'use strict'
const express = require('express');
const router = express.Router();

const db = require('../db');

router.get('/', (req, res) => {
  db.fetchUsers().then((users) => {
    console.log(users);
  })
  .catch((err) => {
    console.log(err);
  });
  res.send('Hello, world!');
});

router.post('/', (req, res) => {
  res.send('Hello, post world!');
});

module.exports = router;