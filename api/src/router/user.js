'use strict'
const express = require('express');
const router = express.Router();

const db = require('../db');

const bcrypt = require('bcrypt');

router.get('/', (req, res) => {
  res.send('Hello, user world!');
});

router.post('/regist',
  (req, res, next) => {
    if (!req.body.userid || !req.body.password || !req.body.email || !req.body.name) {
      return res.status(400).json({ message: 'Invalid request' });
    }
    next();
  }, 
  (req, res) => {
    const userid = req.body.userid;
    const password = req.body.password;
    const email = req.body.email;
    const name = req.body.name;

    const hashedPassword = bcrypt.hashSync(password, 10);
    console.log('hashedPassword: ' + hashedPassword);

    db.addUser(userid, name, email, hashedPassword).then((result) => {
      const user_result = {
        userid: userid,
        name: name,
        email: email
      };
      res.status(200).json({ message: 'User added', user: user_result });
    })
    .catch((err) => {
      res.status(500).json({ message: 'User add failed'});
    });
  }
);

module.exports = router;