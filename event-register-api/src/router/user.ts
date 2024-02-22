import { Router, Request, Response, NextFunction } from 'express';
const router = Router();

import db from '../db';
import bcrypt from 'bcrypt';

router.get('/', (req: Request, res: Response) => {
  res.send('Hello, user world!');
});

router.post('/regist',
  (req: Request, res: Response, next: NextFunction) => {
    if (!req.body.userid || !req.body.password || !req.body.email || !req.body.name) {
      return res.status(400).json({ message: 'Invalid request' });
    }
    next();
  }, 
  (req: Request, res: Response) => {
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
    .catch((err: Error) => {
      res.status(500).json({ message: 'User add failed'});
    });
  }
);

export default router;