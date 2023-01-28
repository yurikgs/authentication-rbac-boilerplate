import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { AuthService } from '../auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly authService: AuthService) {}

  canActivate(context: ExecutionContext) {
    const auth =
      context.switchToHttp().getRequest().headers.authorization ?? '';

    const token = auth.split(' ')[1];
    try {
      this.authService.checkToken(token);
      return true;
    } catch (e) {
      return false;
    }
  }
}
