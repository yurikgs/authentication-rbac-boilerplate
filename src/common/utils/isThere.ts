/**
 * Verifies the existence of something.
 * Primarily, verifies if a generic entity exists, returning an id-based mnessage. But it can be set to verify any existence with proper custom messages.
 */

import { HttpException, Logger, NotFoundException } from '@nestjs/common';

export function isThere(
  entity: any,
  context: null | string = null,
  isReturnMethod = true,
  message?: string,
  error?: { message?: string; statusCode?: string },
) {
  if (!message) {
    message = '404: The searched id does not exist in database';
  }
  if (entity) {
    return entity;
  } else {
    if (isReturnMethod) {
      context ? Logger.warn(message, context) : Logger.warn(message);
      if (error) Logger.error(error);
      throw new HttpException(
        message,
        error && !isNaN(Number(error.statusCode))
          ? Number(error.statusCode)
          : 404,
      );
    } else {
      return false;
    }
  }
}
