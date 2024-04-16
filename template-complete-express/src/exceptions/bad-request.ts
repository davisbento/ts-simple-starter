import HttpException from '@/exceptions/http-exception';

class BadRequestException extends HttpException {
  constructor(message: string) {
    super(message, 400);
  }
}

export default BadRequestException;
