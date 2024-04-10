import { constants } from '@/config/constants';
import { JWTPayload } from '@/dto/user';
import jwt from 'jsonwebtoken';

export const generateToken = (payload: JWTPayload) => {
  return jwt.sign(
    {
      sub: payload.userId,
    },
    constants.jwtSecret,
    { expiresIn: '7d' }
  );
};

export const verifyToken = (token: string) => {
  return jwt.verify(token, constants.jwtSecret);
};
