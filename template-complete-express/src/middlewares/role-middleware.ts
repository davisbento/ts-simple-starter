import { UserRoleEnum } from '@/entities/user-entity';
import { makeAuthenticatedInterface } from '@/libs/express-request';
import { NextFunction, Request, Response } from 'express';

export const roleMiddleware =
  (role: UserRoleEnum) =>
  async (req: Request, res: Response, next: NextFunction) => {
    const { user: userAuthReq } = makeAuthenticatedInterface(req);

    if (!userAuthReq?.role || userAuthReq.role !== role) {
      return res.status(403).json({
        message: 'Forbidden',
      });
    }

    return next();
  };
