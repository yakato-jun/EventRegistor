'use strict';
const LocalStrategy = require('passport-local').Strategy;

const db = require('../db');
const bcrypt = require('bcrypt');

const localStrategy = new LocalStrategy(
  { usernameField: 'userid', passwordField: 'password'},
  async (userid, password, done) => {
    console.log('userid: ' + userid + ', password: ' + password);
    try {
      const user_info = await db.findUserById(userid);

      if (!user_info) {
        return done(null, false, { message: 'Incorrect userid.' });
      }

      if (bcrypt.compare(password, user_info.password) === false) {
        return done(null, false, { message: 'Incorrect password.' });
      }

      return done(null, user_info);
    } catch (err) {
      return done(err);
    }
  }
);

module.exports = localStrategy;