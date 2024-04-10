import { LoginPayload, LoginResponse } from '@/dto/user';
import BadRequestException from '@/exceptions/badRequestException';
import UnprocessableEntityException from '@/exceptions/unprocessableEntityException';
import { comparePassword, hashPassword } from '@/libs/bcrypt';
import { generateToken } from '@/libs/jwt';
import { prismaClient } from '@/libs/prisma';
import { formatZodError } from '@/libs/validator';
import { createUserSchema, loginUserSchema } from '@/validators/user';
import { ZodError } from 'zod';

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
      throw new BadRequestException('Bad credentials');
    }

    const isPasswordMatched = await comparePassword(
      payload.password,
      user.password
    );

    if (!isPasswordMatched) {
      throw new BadRequestException('Bad credentials');
    }

    const token = generateToken({ userId: user.id });

    return {
      token,
    };
  } catch (err) {
    if (err instanceof ZodError) {
      const formattedError = formatZodError(err);
      const messageArray = formattedError.map(err => err.message);
      throw new UnprocessableEntityException(messageArray);
    }

    throw new BadRequestException(err?.message || 'Failed to login user');
  }
};

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
    if (err instanceof ZodError) {
      const formattedError = formatZodError(err);
      const messageArray = formattedError.map(err => err.message);
      throw new UnprocessableEntityException(messageArray);
    }

    throw new BadRequestException(err?.message || 'Failed to register user');
  }
};
