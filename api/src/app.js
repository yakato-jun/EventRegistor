'use strict'
const express = require('express');
const http = require('http');
const auth = require('./auth');

const router = require('./router');
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// initialize passport
auth.initialize(app);

// 環境変数が development の場合のみ、リクエストのログを出力する
if (process.env.NODE_ENV === 'development') {
  app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] Requested ${req.method} ${req.originalUrl}`);
    next();
  });
}

app.use('/', router);

const server = http.createServer(app);
server.listen(3000);

module.exports = app;