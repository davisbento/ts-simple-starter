import HttpException from '@/interfaces/HttpException';

class BadRequestException extends HttpException {
  constructor(message: string) {
    super(message, 400);
  }
}

export default BadRequestException;
