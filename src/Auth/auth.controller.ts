import { Body, Controller, Post, Headers } from '@nestjs/common';
import { UseGuards } from '@nestjs/common/decorators';
import { UserService } from 'src/user/user.service';
import { AuthService } from './auth.service';
import { User } from './decorators/user-decorator';
import { AuthForgetDTO } from './dto/auth-forget.dto';
import { AuthLoginDTO } from './dto/auth-login.dto';
import { AuthRegisterDTO } from './dto/auth-register.dto';
import { AuthResetDTO } from './dto/auth-reset.dto';
import { AuthGuard } from './guards/auth.guard';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
  ) {}

  @Post('register')
  async register(@Body() user: AuthRegisterDTO) {
    return this.userService.store(user);
  }

  @Post('login')
  async login(@Body() { email, password }: AuthLoginDTO) {
    return this.authService.login(email, password);
  }

  @Post('forget')
  async forget(@Body() { email }: AuthForgetDTO) {
    return this.authService.forget(email);
  }

  @Post('reset')
  async reset(@Body() { password, token }: AuthResetDTO) {
    return this.authService.reset(password, token);
  }

  @UseGuards(AuthGuard)
  @Post('check-token')
  async checkToken(
    @Headers('authorization') authorization: string,
    @User('id') user,
  ) {
    // Cuidado! o password ainda está visível!
    return {
      user,
      token: this.authService.checkToken(
        authorization ? authorization.split(' ')[1] : '',
      ),
    };
  }
}
