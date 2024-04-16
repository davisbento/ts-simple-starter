import HttpException from '@/exceptions/http-exception';
import { NextFunction, Request, Response } from 'express';

export const errorMiddleware = (
  err: HttpException,
  req: Request,
  res: Response,
  _next: NextFunction
) => {
  if (!err?.status || err.status === 500) {
    console.log('internal error', err.message);
    return res.status(500).json({ error: 'internal-server-error' });
  }

  return res.status(err.status).json({ error: err.message });
};
