import { SetMetadata } from '@nestjs/common';
import { UserRole } from '../schemas/user.schema';
import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const Roles = (...roles: UserRole[]) => SetMetadata('roles', roles);

export const GetUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.user;
  },
);
