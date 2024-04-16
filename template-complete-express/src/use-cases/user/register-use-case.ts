import BadRequestException from '@/exceptions/bad-request';
import { hashPassword } from '@/libs/password';
import {
  createUserRepository,
  findUserByEmailRepository,
} from '@/repositories/user-repository';
import { errorHandler } from '@/utils/error-handler';
import { CreateUserPayload, createUserSchema } from '@/validators/user';

export const registerUseCase = async (payload: CreateUserPayload) => {
  try {
    createUserSchema.parse(payload);

    const user = await findUserByEmailRepository(payload.email);

    if (user) {
      throw new BadRequestException('User already exist');
    }

    const passwordHashed = await hashPassword(payload.password);

    const newUser = await createUserRepository({
      email: payload.email,
      password: passwordHashed,
    });

    return {
      id: newUser.id,
      email: newUser.email,
    };
  } catch (err) {
    errorHandler(err);
  }
};
