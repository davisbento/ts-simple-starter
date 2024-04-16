import { UserRoleEnum } from '@/entities/user-entity';
import { AuthenticatedRequest } from '@/interfaces/request';
import { Request } from 'express';

export const makeAuthenticatedInterface = (
  req: Request
): AuthenticatedRequest => {
  const userId = (req as any).user.userId as number;
  const role = (req as any).user.role as UserRoleEnum;

  return {
    body: req.body,
    user: {
      userId,
      role,
    },
  };
};
