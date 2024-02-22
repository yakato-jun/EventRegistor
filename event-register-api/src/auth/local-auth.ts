import { Strategy as LocalStrategy } from 'passport-local';
import db from '../db';
import bcrypt from 'bcrypt';
import { AppUser } from 'app-types';

const localStrategy = new LocalStrategy(
  { usernameField: 'userid', passwordField: 'password'},
  async (userid: string, password: string, done) => {
    console.log('userid: ' + userid + ', password: ' + password);
    try {
      const user_info: AppUser = await db.findUserById(userid);

      if (!user_info) {
        return done(null, false, { message: 'Incorrect userid.' });
      }

      if (await bcrypt.compare(password, user_info.password) === false) {
        return done(null, false, { message: 'Incorrect password.' });
      }

      return done(null, user_info);
    } catch (err) {
      return done(err);
    }
  }
);

export default localStrategy;