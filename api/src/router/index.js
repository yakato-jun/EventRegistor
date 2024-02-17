'use strict'
const express = require('express');
const router = express.Router();

const rootRouter = require('./root');
const userRouter = require('./user');
const loginRouter = require('./login');

console.log('router/index.js');

router.use('/', rootRouter);
router.use('/user', userRouter);
router.use('/login', loginRouter);

module.exports = router;