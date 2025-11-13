import { Body, Controller, Delete, HttpCode, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';
import { AuthGuard } from '@nestjs/passport';
import { ChangePasswordDto } from './dto/change-password';
import { GetUser } from 'src/libs/decorators/user.decorator';
import { Public } from 'src/libs/decorators/public-route.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('sign-up')
  @HttpCode(201)
  signUp(@Body() body: SignUpDto) {
    return this.authService.signUp(body);
  }

  @Public()
  @Post('login')
  login(@Body() body: LoginDto) {
    return this.authService.login(body);
  }

  @Delete('logout')
  @HttpCode(204)
  async logOut(@GetUser() user, @Body() body) {
    await this.authService.logOut(user.userId, body.refreshToken);
  }

  @UseGuards(AuthGuard('jwt-refresh'))
  @Post('refresh-token')
  refreshToken(@GetUser() user, @Body() body) {
    return this.authService.handleRefreshToken(user.userId, body.refreshToken);
  }

  @Post('change-password')
  changePassword(@GetUser() user, @Body() body: ChangePasswordDto) {
    return this.authService.changePassword(user.userId, body);
  }
}
