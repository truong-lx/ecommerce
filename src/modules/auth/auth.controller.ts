import { Body, Controller, Delete, HttpCode, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';
import { AuthGuard } from '@nestjs/passport';
import { ChangePasswordDto } from './dto/change-password';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('sign-up')
  @HttpCode(201)
  signUp(@Body() body: SignUpDto) {
    return this.authService.signUp(body);
  }

  @Post('login')
  login(@Body() body: LoginDto) {
    return this.authService.login(body);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete('logout')
  @HttpCode(204)
  async logOut(@Request() request, @Body() body) {
    await this.authService.logOut(request.user.userId, body.refreshToken);
  }

  @UseGuards(AuthGuard('jwt-refresh'))
  @Post('refresh-token')
  refreshToken(@Request() request, @Body() body) {
    return this.authService.handleRefreshToken(request.user.userId, body.refreshToken);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('change-password')
  changePassword(@Request() request, @Body() body: ChangePasswordDto) {
    return this.authService.changePassword(request.user.userId, body);
  }
}
