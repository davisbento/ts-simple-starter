import { constants } from '@/config/constants';
import { JWTPayload, JWTResponse } from '@/dto/user';
import jwt from 'jsonwebtoken';

export const generateToken = (payload: JWTPayload) => {
  return jwt.sign(
    {
      sub: payload.userId,
      role: payload.role,
    },
    constants.jwtSecret,
    { expiresIn: '7d' }
  );
};

export const verifyToken = (token: string) => {
  const decoded = jwt.verify(
    token,
    constants.jwtSecret
    // just to override the sub type
    // as the sub is string in the default jwt lib
    // but we are using number
  ) as unknown as JWTResponse;

  return decoded;
};
