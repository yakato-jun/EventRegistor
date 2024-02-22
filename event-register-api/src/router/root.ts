import {Router, Request, Response, NextFunction} from 'express';
import { AppUser } from 'app-types';
const router = Router();

import db from '../db';

// for debug
router.get('/', (req: Request, res: Response) => {
  // get all users
  db.fetchUsers().then((users: AppUser[]) => {
    console.log(users);
  })
  .catch((err: Error) => {
    console.log(err);
  });

  // check authentication
  if (req.isAuthenticated()) {
    console.log('authenticated');
    console.log(req.user);
  } else {
    console.log('not authenticated');
  }

  // send Hello, world!
  res.send('Hello, world!');
});

router.post('/', (req: Request, res: Response) => {
  res.send('Hello, post world!');
});

export default router;