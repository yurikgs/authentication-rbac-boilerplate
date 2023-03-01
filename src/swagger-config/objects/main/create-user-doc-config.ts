import { CreateUserApiBodyConfig } from '../api-body';
import { statusConfigPatternsDict } from 'nestjs-swagger-config';
export const CreateUserDocConfig = {
  apiOperation: CreateUserApiBodyConfig,
  apiBody: CreateUserApiBodyConfig,
  responses: {
    basicDefaults: { config: statusConfigPatternsDict.standardPost },
  },
};
