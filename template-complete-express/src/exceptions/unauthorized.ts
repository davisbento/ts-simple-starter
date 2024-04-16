import HttpException from '@/exceptions/http-exception';

class UnauthorizedException extends HttpException {
  constructor(message: string) {
    super(message, 401);
  }
}

export default UnauthorizedException;
