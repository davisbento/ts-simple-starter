import HttpException from '@/interfaces/httpException';

class BadRequestException extends HttpException {
  constructor(message: string) {
    super(message, 400);
  }
}

export default BadRequestException;
