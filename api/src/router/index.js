'use strict'
const express = require('express');
const router = express.Router();

const rootRouter = require('./root');
const userRouter = require('./user');

router.use('/', rootRouter);
router.use('/user', userRouter);


module.exports = router;