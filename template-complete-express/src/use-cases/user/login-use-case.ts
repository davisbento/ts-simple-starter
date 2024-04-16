import { LoginResponse } from '@/dto/user';
import UnauthorizedException from '@/exceptions/unauthorized';
import { comparePassword } from '@/libs/password';
import { generateToken } from '@/libs/jwt';
import { findUserByEmailRepository } from '@/repositories/user-repository';
import { errorHandler } from '@/utils/error-handler';
import { LoginPayload, loginUserSchema } from '@/validators/user';

export const loginUseCase = async (
  payload: LoginPayload
): Promise<LoginResponse> => {
  try {
    loginUserSchema.parse(payload);

    const user = await findUserByEmailRepository(payload.email);

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

    const token = generateToken({ userId: user.id, role: user.role });

    return {
      token,
    };
  } catch (err) {
    errorHandler(err);
  }
};
