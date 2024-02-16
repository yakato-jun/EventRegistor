'use strict'
const express = require('express');
const session = require('express-session');
const passport = require('passport');

const localAuth = require('./local-auth');


app.use(session({ secret: 'secretKey', resave: false, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

passport.use('local', localAuth);
passport.serializeUser((user, done) => {
  done(null, user.user_id);
});

passport.deserializeUser(async (userid, done) => {
  try {
    const user_info = await db.findUserById(userid);
    done(null, user_info);
  } catch (err) {
    done(err);
  }
});

module.exports = {
  passport: passport
};

