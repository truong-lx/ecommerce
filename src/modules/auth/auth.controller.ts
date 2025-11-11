import { Body, Controller, Delete, HttpCode, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';
import { AuthGuard } from '@nestjs/passport';

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
  logout(@Request() request) {
    const refreshToken = request.headers.get('x-refresh-token');
    return refreshToken;
  }

  @UseGuards(AuthGuard('jwt-refresh'))
  @Post('refresh-token')
  onRefreshToken(@Request() request, @Body() body) {
    console.log('body: ', body);
    return this.authService.handleRefreshToken({
      userId: request.user.userId,
      refreshToken: body.refreshToken,
    });
  }
}
