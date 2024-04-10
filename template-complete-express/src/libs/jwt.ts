import { constants } from '@/config/constants';
import { JWTPayload, JWTResponse } from '@/dto/user';
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
  const decoded = jwt.verify(token, constants.jwtSecret);

  return {
    sub: (decoded as any).sub,
  } as JWTResponse;
};
