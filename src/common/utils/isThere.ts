import { Logger, NotFoundException } from '@nestjs/common';

export function isThere(
  entity: any,
  context: null | string = null,
  isReturnMethod = true,
  message?: string,
  error?: any,
) {
  if (!message) message = '404: The searched id does not exist in database';
  if (entity) {
    return entity;
  } else {
    if (isReturnMethod) {
      context ? Logger.warn(message, context) : Logger.warn(message);
      if (error) {
        Logger.error(error);
      }
      throw new NotFoundException(
        '404: The searched id does not exist in database',
      );
    } else {
      return false;
    }
  }
}
