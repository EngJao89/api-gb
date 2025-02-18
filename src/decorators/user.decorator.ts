import {
  createParamDecorator,
  ExecutionContext,
  NotFoundException,
} from '@nestjs/common';

export const User = createParamDecorator(
  (filters: string | string[] | undefined, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest();

    if (!request.user) {
      throw new NotFoundException('User not found. Please use the authGuard');
    }

    if (!filters) {
      return request.user;
    }

    if (typeof filters === 'string') {
      return request.user[filters];
    }

    return filters.reduce((result, field) => {
      if (field in request.user) {
        result[field] = request.user[field];
      }
      return result;
    }, {});
  },
);
