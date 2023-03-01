import { Body, Controller, Post, Headers } from '@nestjs/common';
import { UseGuards } from '@nestjs/common/decorators';
import { UserService } from 'src/app/user/user.service';
import { AuthService } from './auth.service';
import { User } from '../../common/decorators/user-decorator';
import { AuthForgetDTO } from './dto/auth-forget.dto';
import { AuthLoginDTO } from './dto/auth-login.dto';
import { AuthRegisterDTO } from './dto/auth-register.dto';
import { AuthResetDTO } from './dto/auth-reset.dto';
import { AuthGuard } from '../../common/guards/auth.guard';
import { ThrottlerGuard } from '@nestjs/throttler/dist/throttler.guard';
import { Throttle } from '@nestjs/throttler/dist/throttler.decorator';
import { THROTTLE_AUTH_LIMIT, THROTTLE_AUTH_TTL } from 'src/common/constants';
import { ApiTags } from '@nestjs/swagger/dist/decorators';
import { MethodDocConfig } from 'nestjs-swagger-config/src/method-main-generator/decorators/method-doc-config';
import { statusConfigPatternsDict } from 'nestjs-swagger-config/src/responses-generator/dicts/status-config-patterns-dict';
import { OperationsDefaultResponses } from 'nestjs-swagger-config/src/responses-generator/decorators/operations-default-responses';
import { authRegisterDocConfig } from 'src/swagger-config/objects/main/auth-register-doc-config';

@ApiTags('Auth')
@UseGuards(ThrottlerGuard)
@Throttle(THROTTLE_AUTH_LIMIT, THROTTLE_AUTH_TTL)
@Controller('auth')
export class AuthController {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
  ) {}

  @MethodDocConfig(authRegisterDocConfig)
  @Post('register')
  async register(@Body() user: AuthRegisterDTO) {
    return this.userService.store(user);
  }

  @OperationsDefaultResponses(statusConfigPatternsDict.standardPost)
  @Post('login')
  async login(@Body() { email, password }: AuthLoginDTO) {
    return this.authService.login(email, password);
  }

  @OperationsDefaultResponses(statusConfigPatternsDict.standardPost)
  @Post('forget')
  async forget(@Body() { email }: AuthForgetDTO) {
    return this.authService.forget(email);
  }

  @OperationsDefaultResponses(statusConfigPatternsDict.standardPost)
  @Post('reset')
  async reset(@Body() { password, token }: AuthResetDTO) {
    return this.authService.reset(password, token);
  }

  // TODO: Ignore this method??
  @OperationsDefaultResponses(statusConfigPatternsDict.standardPost)
  @UseGuards(AuthGuard)
  @Post('check-token')
  async checkToken(
    @Headers('authorization') authorization: string,
    @User('id') user,
  ) {
    return {
      user,
      token: this.authService.checkToken(
        authorization ? authorization.split(' ')[1] : '',
      ),
    };
  }
}
