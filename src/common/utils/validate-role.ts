/**
 * Validate if a Data Transfer Object user Role is valid based on that type and Role enum compatibility
 */
import { BadRequestException } from '@nestjs/common/exceptions/bad-request.exception';
import { Logger } from '@nestjs/common';
import { Role } from 'src/common/enums/role.enum';

export function validateRole(dto) {
  let isValidRole = 0;
  if (dto.role) {
    for (const role in Role) {
      if (!isNaN(Number(role)) && dto.role == role) {
        dto.role = Number(role);
        isValidRole++;
      }
    }
    if (!isValidRole) {
      Logger.error(`Invalid Role`);
      throw new BadRequestException(`Invalid Role`);
    }
  }
  return dto;
}
