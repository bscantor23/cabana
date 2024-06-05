import { SetMetadata } from '@nestjs/common';
import { ROLES } from '../../constants/roles';
import { SESSION_MODIFY_KEY } from '../../constants/key-decorators';

export const SessionModify = (...roles: Array<keyof typeof ROLES>) =>
  SetMetadata(SESSION_MODIFY_KEY, roles);
