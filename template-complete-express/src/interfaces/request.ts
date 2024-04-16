import { UserRoleEnum } from '@/entities/user-entity';
import { Request } from 'express';

export type AuthenticatedRequest = {
  user: {
    userId: number;
    role: UserRoleEnum;
  };
  body: Request['body'];
};
