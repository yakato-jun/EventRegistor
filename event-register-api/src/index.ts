import express, { Express } from 'express';

import http from 'http';
import auth from './auth';
import router from './router';
import dotenv from 'dotenv';

// load environment variables
dotenv.config();

const app: Express = express();

// use express middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// initialize passport
auth.initialize(app);

// output request logs in development mode
if (process.env.NODE_ENV === 'development') {
  app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] Requested ${req.method} ${req.originalUrl}`);
    next();
  });
}

app.use('/', router);

const server = http.createServer(app);
server.listen(3000);

export default app;