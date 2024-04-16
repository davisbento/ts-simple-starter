import { makeAuthenticatedInterface } from '@/libs/express-request';
import { profileUseCase } from '@/use-cases/user';
import { NextFunction, Request, Response } from 'express';

export const buildUserProfileController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const authReq = makeAuthenticatedInterface(req);

    const user = await profileUseCase(authReq.user.userId);

    res.json(user);
  } catch (err) {
    next(err);
  }
};
