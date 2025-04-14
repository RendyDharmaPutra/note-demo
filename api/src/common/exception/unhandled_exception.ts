import { HttpStatus } from '@nestjs/common';
import { CommonException } from './common_exception';

export const unhandledError = (problem: string, error: any) => {
  console.error(`Terjadi kesalahan: ${error}`);

  throw new CommonException(
    `Gagal ${problem}`,
    'Terjadi kesalahan tidak diketahui',
    HttpStatus.BAD_REQUEST,
  );
};
