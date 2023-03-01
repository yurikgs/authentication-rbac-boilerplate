import { ApiBodyOptions } from '@nestjs/swagger';
import { TestCreateUserDTO } from '../models/dto/test-create-user.dto';

export const CreateUserApiBodyConfig: ApiBodyOptions = {
  type: TestCreateUserDTO,
  description:
    'Allows Admin or Standard Users. You can set the user type in "role property".',
  examples: {
    Admin: {
      summary: 'Admin User creation example',
      description: 'Example of Using Admin as Role',
      value: {
        name: 'Admin Name',
        email: 'admin@admin.com',
        password: 'user1234',
        role: 'Admin',
        birthAt: '1992-06-08',
      },
    },
    User: {
      summary: 'Standard User creation example',
      description: 'Example of Using Admin as Role',
      value: {
        name: 'User Name',
        email: 'user@user.com',
        password: 'user1234',
        role: 'User',
        birthAt: '1992-06-08',
      },
    },
  },
};

export const AuthRegisterApiBodyConfig: ApiBodyOptions = {
  type: TestCreateUserDTO,
  description:
    'Allows Admin or Standard Users. You can set the user type in "role property".',
  examples: {
    Admin: {
      summary: 'Admin User creation example',
      description: 'Example of Using Admin as Role',
      value: {
        name: 'Admin Name',
        email: 'admin@admin.com',
        password: 'admin1234',
        role: 'Admin',
        birthAt: '1992-06-08',
      },
    },
    User: {
      summary: 'Standard User creation example',
      description: 'Example of Using Admin as Role',
      value: {
        name: 'User Name',
        email: 'user@user.com',
        password: 'user1234',
        role: 'User',
        birthAt: '1992-06-08',
      },
    },
  },
};
