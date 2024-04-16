import { verifyToken } from '@/libs/jwt';
import { NextFunction, Request, Response } from 'express';

export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers.authorization
    ? req.headers.authorization.replace('Bearer ', '')
    : '';

  if (!token) {
    return res.status(401).json({
      message: 'Unauthorized',
    });
  }

  try {
    const decoded = verifyToken(token);

    (req as any).user = {
      userId: decoded.sub,
    };

    return next();
  } catch (err) {
    res.status(401).json({
      message: 'Unauthorized',
    });
  }
};
