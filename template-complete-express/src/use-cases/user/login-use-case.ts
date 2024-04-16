import { LoginPayload, LoginResponse } from '@/dto/user';
import UnauthorizedException from '@/exceptions/unauthorized';
import { comparePassword } from '@/libs/bcrypt';
import { generateToken } from '@/libs/jwt';
import { prismaClient } from '@/libs/prisma';
import { errorHandler } from '@/utils/error-handler';
import { loginUserSchema } from '@/validators/user';

export const loginUserService = async (
  payload: LoginPayload
): Promise<LoginResponse> => {
  try {
    loginUserSchema.parse(payload);

    const user = await prismaClient.user.findFirst({
      where: {
        email: payload.email,
      },
    });

    if (!user) {
      throw new UnauthorizedException('Bad credentials');
    }

    const isPasswordMatched = await comparePassword(
      payload.password,
      user.password
    );

    if (!isPasswordMatched) {
      throw new UnauthorizedException('Bad credentials');
    }

    const token = generateToken({ userId: user.id });

    return {
      token,
    };
  } catch (err) {
    errorHandler(err);
  }
};
