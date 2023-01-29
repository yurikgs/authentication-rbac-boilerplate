import { Logger, NotFoundException } from '@nestjs/common';

export function isThere(
  entity: any,
  context: null | string = null,
  isReturnMethod = true,
  message?: string,
  error?: any,
) {
  if (!message) message = '404: O id consultado não existe no banco de dados';
  if (entity) {
    return entity;
  } else {
    if (isReturnMethod) {
      context ? Logger.warn(message, context) : Logger.warn(message);
      if (error) {
        Logger.error(error);
      }
      throw new NotFoundException(
        'O id consultado não existe no banco de dados',
      );
    } else {
      return false;
    }
  }
}
