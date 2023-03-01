/**
 * Validate if a Data Transfer Object user Role is valid based on that type and Role enum compatibility
 */
import { BadRequestException } from '@nestjs/common/exceptions/bad-request.exception';
import { Logger } from '@nestjs/common';
import { Role } from 'src/common/enums/role.enum';
import { ExceptionMessagesDict } from '../dicts/exception-messages.dict';

export function validateRole(dto) {
  let isValidRole = false;
  if (dto.role) {
    for (const role in Role) {
      if (!isValidRole && typeof role == 'string' && role == dto.role) {
        isValidRole = true;
        dto.role = Role[role];
      }
    }
    if (!isValidRole) {
      Logger.error(ExceptionMessagesDict.INVALID_ROLE);
      throw new BadRequestException(ExceptionMessagesDict.INVALID_ROLE);
    }
  }
  return dto;
}
