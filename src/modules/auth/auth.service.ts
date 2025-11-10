import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from '../user/schemas/user.schema';
import { Model } from 'mongoose';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { LoginDto } from './dto/login.dto';
import bcrypt from 'bcrypt';
@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModal: Model<UserDocument>,
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async login({ email, password }: LoginDto) {
    const findUser = await this.userService.findUserByEmail(email);
    if (!findUser) throw new UnauthorizedException('Email not found!');
    const match = await bcrypt.compare(password, findUser.password);
    if (!match) throw new UnauthorizedException('Password is wrong!');
    const payload = { userId: findUser._id, email };
    const accessToken = this.jwtService.sign(payload);
    const refreshToken = this.jwtService.sign(payload, {
      secret: process.env.JWT_REFRESH_SECRET,
      expiresIn: '7d',
    });
    findUser.refreshTokens.push(refreshToken);
    await findUser.save();
    return {
      accessToken,
      refreshToken,
    };
  }
}
