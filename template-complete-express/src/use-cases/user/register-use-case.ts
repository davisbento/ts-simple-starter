import { LoginPayload } from '@/dto/user';
import BadRequestException from '@/exceptions/bad-request';
import { hashPassword } from '@/libs/bcrypt';
import { prismaClient } from '@/libs/prisma';
import { errorHandler } from '@/utils/error-handler';
import { createUserSchema } from '@/validators/user';

export const registerUserService = async (payload: LoginPayload) => {
  try {
    createUserSchema.parse(payload);

    const userExist = await prismaClient.user.findFirst({
      where: {
        email: payload.email,
      },
    });

    if (userExist) {
      throw new BadRequestException('User already exist');
    }

    const passwordHashed = await hashPassword(payload.password);

    const user = await prismaClient.user.create({
      data: {
        email: payload.email,
        password: passwordHashed,
      },
    });

    return {
      id: user.id,
      email: user.email,
    };
  } catch (err) {
    errorHandler(err);
  }
};
