import { UserEntity } from '@/entities/user-entity';
import { prismaClient } from '@/libs/prisma';
import { CreateUserPayload } from '@/validators/user';

export const createUserRepository = async (
  payload: CreateUserPayload
): Promise<UserEntity> => {
  try {
    const response = await prismaClient.user.create({
      data: {
        email: payload.email,
        password: payload.password,
      },
    });

    return response;
  } catch (err) {
    throw err;
  }
};

export const findUserByEmailRepository = async (
  email: string
): Promise<UserEntity | null> => {
  try {
    const user = await prismaClient.user.findFirst({
      where: {
        email,
      },
    });

    return user;
  } catch (err) {
    throw err;
  }
};

export const findUserByIdRepository = async (
  id: number
): Promise<UserEntity | null> => {
  try {
    const user = await prismaClient.user.findFirst({
      where: {
        id,
      },
    });

    return user;
  } catch (err) {
    throw err;
  }
};
