import {
  CanActivate,
  ExecutionContext,
  HttpException,
  Injectable,
} from '@nestjs/common';

@Injectable()
export class AlojamientosModuleGuard implements CanActivate {
  constructor() {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    let request = context.switchToHttp().getRequest();

    if (request.body.id_propietario) {
      throw new HttpException('PropietarioNotAllowedToSpecify', 401);
    }

    request.body = {
      ...request.body,
      id_propietario: request.user.sub,
    };

    return true;
  }
}
