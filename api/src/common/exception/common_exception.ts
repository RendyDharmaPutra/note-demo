import { HttpException } from '@nestjs/common';

export class CommonException<T> extends HttpException {
  constructor(message: string, errorMessage: T, status: number) {
    super(
      {
        success: false,
        message: message,
        error: errorMessage,
      },
      status,
    );
  }
}
