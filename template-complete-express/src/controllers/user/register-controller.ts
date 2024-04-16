import { registerUseCase } from '@/use-cases/user';
import { NextFunction, Request, Response } from 'express';

export const buildRegisterController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await registerUseCase(req.body);

    res.json(user);
  } catch (err) {
    next(err);
  }
};
