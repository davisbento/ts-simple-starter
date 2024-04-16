import HttpException from '@/exceptions/http-exception';

class UnprocessableEntityException extends HttpException {
  constructor(messageArray: string[]) {
    const message = messageArray.join(', ');
    super(message, 422);
  }
}

export default UnprocessableEntityException;
