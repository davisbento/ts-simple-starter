import { UserProfileResponse } from '@/dto/user';
import UnauthorizedException from '@/exceptions/unauthorized';
import { findUserByIdRepository } from '@/repositories/user-repository';
import { errorHandler } from '@/utils/error-handler';

export const profileUseCase = async (
  userId: number
): Promise<UserProfileResponse> => {
  try {
    if (!userId) throw new UnauthorizedException('User not found');

    const user = await findUserByIdRepository(userId);

    if (!user) throw new UnauthorizedException('User not found');

    return {
      id: user.id,
      email: user.email,
      role: user.role,
    };
  } catch (err) {
    errorHandler(err);
  }
};
