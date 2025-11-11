import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-jwt';

@Injectable()
export class RefreshStrategy extends PassportStrategy(Strategy, 'jwt-refresh') {
  constructor(configService: ConfigService) {
    super({
      jwtFromRequest: request => request.body.refreshToken,
      secretOrKey: configService.get('JWT_REFRESH_SECRET'),
    });
  }

  validate(payload) {
    return payload;
  }
}
