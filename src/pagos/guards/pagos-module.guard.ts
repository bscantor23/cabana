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
import { PagosService } from '../pagos.service';

@Injectable()
export class PagosModuleGuard implements CanActivate {
  constructor() {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    return true;
  }
}
