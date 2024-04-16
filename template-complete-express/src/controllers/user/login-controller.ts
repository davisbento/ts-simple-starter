import { loginUseCase } from '@/use-cases/user';
import { NextFunction, Request, Response } from 'express';

export const buildLoginController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { token } = await loginUseCase(req.body);

    res.json({
      token,
    });
  } catch (err) {
    next(err);
  }
};
