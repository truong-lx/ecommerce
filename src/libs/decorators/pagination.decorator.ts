import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export interface PaginationParams {
  page: number;
  limit: number;
}

export const Pagination = createParamDecorator(
  (_: unknown, ctx: ExecutionContext): PaginationParams => {
    const request = ctx.switchToHttp().getRequest();

    const page = parseInt(request.query.page) || 1;
    let limit = parseInt(request.query.limit) || 20;

    if (limit > 100) limit = 100;

    return { page, limit };
  },
);
