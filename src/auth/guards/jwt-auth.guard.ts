import {
  ExecutionContext,
  HttpException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { JsonWebTokenError, JwtService } from '@nestjs/jwt';
import { ROLES } from 'src/constants/roles';
import { ROLES_KEY } from 'src/constants/key-decorators';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(private readonly reflector: Reflector) {
    super();
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    const roles = this.reflector.get<Array<keyof typeof ROLES>>(
      ROLES_KEY,
      context.getHandler(),
    );

    if (roles.length > 0) {
      const isAuth = roles.some((role) => ROLES[role] === request.user.role);
      if (!isAuth) {
        throw new HttpException('Unauthorized', 401);
      }
    }

    return true;
  }
}
