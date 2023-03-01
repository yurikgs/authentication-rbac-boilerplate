import { ApiParamOptions } from '@nestjs/swagger';

export const ShowUserApiParamConfigObject: ApiParamOptions = {
  name: 'id',
  description: 'Send the target user id as a path param ',
};
