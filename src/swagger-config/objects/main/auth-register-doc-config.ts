import { AuthRegisterApiBodyConfig } from '../api-body';
import { statusConfigPatternsDict } from 'nestjs-swagger-config';

export const authRegisterDocConfig = {
  apiBody: AuthRegisterApiBodyConfig,
  responses: {
    basicDefaults: { config: statusConfigPatternsDict.standardPost },
  },
};
