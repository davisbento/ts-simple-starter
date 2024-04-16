import { UserRoleEnum } from '@/entities/user-entity';

export type LoginResponse = {
  token: string;
};

export type UserProfileResponse = {
  id: number;
  email: string;
  role: UserRoleEnum;
};

export type JWTPayload = {
  userId: number;
  role: UserRoleEnum;
};

export type JWTResponse = {
  sub: number;
  role: UserRoleEnum;
};
