import { Router, Request, Response, NextFunction } from 'express';
import { AppUser } from 'app-types';

const router = Router();

import auth from '../auth';

router.post('/', (req: Request, res: Response, next: NextFunction) => {
  auth.passport.authenticate('local', (err: Error | null, user: AppUser | false, info?: any) => {
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

export default router;