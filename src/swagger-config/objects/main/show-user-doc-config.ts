import { statusConfigPatternsDict } from 'nestjs-swagger-config';
import { ShowUserApiParamConfigObject } from '../api-param';

export const showUserDocConfig = {
  apiParam: ShowUserApiParamConfigObject,
  responses: {
    basicDefaults: { config: statusConfigPatternsDict.standardGetById },
  },
};
