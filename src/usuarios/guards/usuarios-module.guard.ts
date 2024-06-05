import {
  CanActivate,
  ExecutionContext,
  HttpException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES } from '../../constants/roles';
import { SESSION_MODIFY_KEY } from '../../constants/key-decorators';

@Injectable()
export class UsuariosModuleGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    if (request.params.id) {
      const rolesSessionModify = this.reflector.get<Array<keyof typeof ROLES>>(
        SESSION_MODIFY_KEY,
        context.getHandler(),
      );

      let isValidToModify = false;
      if (rolesSessionModify && rolesSessionModify.length > 0) {
        isValidToModify = rolesSessionModify.some(
          (role) => ROLES[role] === request.user.role,
        );
      }

      if (!isValidToModify && request.user.sub !== request.params.id) {
        throw new HttpException('Unauthorized', 401);
      }
    }

    return true;
  }
}
