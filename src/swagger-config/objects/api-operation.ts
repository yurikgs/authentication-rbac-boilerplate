import { OperationObject } from '@nestjs/swagger/dist/interfaces/open-api-spec.interface';

export const CreateUserApiOperationConfig: Partial<OperationObject> = {
  description:
    'Creates Users in Data Base. Berarer protected, to be used by admins to manage database users ',
};
