import { Role } from '../enums/role.enum';

import { SetMetadata } from '@nestjs/common';

export const SetAccessRoles = (...roles: Role[]) => SetMetadata('roles', roles);
