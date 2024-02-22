import { Router } from 'express';
const router = Router();

import rootRouter from './root';
import userRouter from './user';
import loginRouter from './login';

router.use('/', rootRouter);
router.use('/user', userRouter);
router.use('/login', loginRouter);

export default router;