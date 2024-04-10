import { Request } from 'express';

export type AuthenticatedRequest = {
  user: {
    userId: number;
  };
  body: Request['body'];
};
