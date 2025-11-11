import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-jwt';
import { UserService } from 'src/modules/user/user.service';

@Injectable()
export class RefreshStrategy extends PassportStrategy(Strategy, 'jwt-refresh') {
  constructor(
    private userService: UserService,
    configService: ConfigService,
  ) {
    super({
      jwtFromRequest: request => request.body.refreshToken,
      secretOrKey: configService.get('JWT_REFRESH_SECRET'),
    });
  }

  async validate(payload) {
    const user = await this.userService.findById(payload.userId).lean();
    if (!user) throw new UnauthorizedException('User not found!');
    return payload;
  }
}
