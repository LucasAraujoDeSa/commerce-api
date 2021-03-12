import 'dotenv/config';
import 'reflect-metadata';
import './database/index';
import './Container/index';

import express, { json, Request, Response, NextFunction } from 'express';

import { router } from './routes/index.routes';
import { AppError } from './errors/AppError';

const app = express();
app.use(json());

app.use(router);

app.use((err: Error, req: Request, res: Response, _: NextFunction) => {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      status: 'error',
      message: err.message,
    });
  }

  return res.status(500).json({
    error: 'error',
    message: err.message,
  });
});

export { app };
