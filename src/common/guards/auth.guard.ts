import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { UserService } from 'src/app/user/user.service';
import { AuthService } from '../../app/auth/auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    const auth = request.headers.authorization ?? '';
    const token = auth.split(' ')[1];

    try {
      const data = this.authService.checkToken(token);
      request.tokenPayload = data;
      request.user = await this.userService.show(data.id);
      return true;
    } catch (e) {
      return false;
    }
  }
}
