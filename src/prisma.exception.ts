import {
  ArgumentsHost,
  Catch,
  ConflictException,
  ExceptionFilter,
  HttpException,
  NotFoundException,
} from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import { Prisma } from './generated/prisma/client';

@Catch(Prisma.PrismaClientKnownRequestError)
export class PrismaExceptionFilter
  extends BaseExceptionFilter
  implements ExceptionFilter
{
  private readonly map: Record<string, new () => HttpException> = {
    P2025: NotFoundException,
    P2002: ConflictException,
  };

  catch(e: Prisma.PrismaClientKnownRequestError, host: ArgumentsHost) {
    const Ex = this.map[e.code];
    // Map known Prisma errors to HTTP exceptions, otherwise let the base
    // filter handle it (renders as a 500).
    super.catch(Ex ? new Ex() : e, host);
  }
}
