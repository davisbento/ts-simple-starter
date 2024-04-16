import HttpException from '@/exceptions/http-exception';
import UnprocessableEntityException from '@/exceptions/unprocessable-entity';
import { formatZodError } from '@/libs/validator';
import { ZodError } from 'zod';

export const errorHandler = (err: any) => {
  if (err instanceof ZodError) {
    const formattedError = formatZodError(err);
    const messageArray = formattedError.map(err => err.message);
    throw new UnprocessableEntityException(messageArray);
  }

  throw new HttpException(
    err?.message || 'Failed to complete the request',
    err?.status
  );
};
