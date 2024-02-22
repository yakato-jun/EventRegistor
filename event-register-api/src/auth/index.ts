import express, { Express } from 'express';
import session from 'express-session';
import passport from 'passport';
import localAuth from './local-auth';
import db from '../db';
import { AppUser } from 'app-types';


// define user info for authentication
declare module 'passport' {
  interface Authenticator {
    serializeUser<TID>(fn: (user: AppUser, done: (err: any, id?: TID) => void) => void): void;
  }
}

// add local strategy to passport
passport.use('local', localAuth);
passport.serializeUser((user: AppUser, done) => {
  // save user id to session
  done(null, user.user_id);
});

passport.deserializeUser(async (userid: string, done) => {
  try {
    // get user info from db and save to req.user
    const user_info = await db.findUserById(userid);
    done(null, user_info);
  } catch (err) {
    // when error occurs, pass it to done
    done(err);
  }
});

const initialize = (app: Express) => {
  // add session and passport middleware
  app.use(session({ secret: 'secretKey', resave: false, saveUninitialized: true }));
  app.use(passport.initialize());
  app.use(passport.session());
};

export default { initialize, passport };
