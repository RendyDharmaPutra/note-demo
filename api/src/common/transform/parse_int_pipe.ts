import { HttpStatus, ParseIntPipe } from '@nestjs/common';
import { CommonException } from '../exception/common_exception';

export class CustomParseIntPipe extends ParseIntPipe {
  constructor(problem: string) {
    super({
      exceptionFactory: (errors) => {
        throw new CommonException(
          `Gagal ${problem}`,
          'Format ID tidak valid',
          HttpStatus.BAD_REQUEST,
        );
      },
    });
  }
}
