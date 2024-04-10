import { AuthenticatedRequest } from '@/interfaces/request';
import { Request } from 'express';

export const createAuthenticatedInterface = (
  req: Request
): AuthenticatedRequest => {
  const userId = (req as any).user.userId;

  return {
    body: req.body,
    user: {
      userId,
    },
  };
};
