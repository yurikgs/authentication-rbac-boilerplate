import { UserModel } from 'src/swagger-config/models/response-models/swagger-user.model';
import { ObjGenModes, statusConfigPatternsDict } from 'nestjs-swagger-config';

export const listUserDetailedDefaultsArray = [
  {
    config: statusConfigPatternsDict.standardGet,
    mode: ObjGenModes.RemoveValues,
    statusCodes: [200, 401, 403],
  },
  {
    status: 200,
    description: 'Ok',
    model: UserModel,
    modelConfig: 'array',
  },
  {
    status: 400,
    description: 'Bad Request',
  },
  {
    status: 401,
  },
];
