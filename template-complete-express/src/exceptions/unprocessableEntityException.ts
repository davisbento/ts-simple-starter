import HttpException from '@/interfaces/httpException';

class UnprocessableEntityException extends HttpException {
  constructor(messageArray: string[]) {
    const message = messageArray.join(', ');
    super(message, 422);
  }
}

export default UnprocessableEntityException;
