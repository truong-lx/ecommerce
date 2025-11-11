import {
  BadRequestException,
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from '../user/schemas/user.schema';
import { Model } from 'mongoose';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { LoginDto } from './dto/login.dto';
import bcrypt from 'bcrypt';
import { SignUpDto } from './dto/signup.dto';
import { ROLE } from 'src/constants/role.enum';
import { convertToObjectId, getFields } from 'src/utils';
import { ConfigService } from '@nestjs/config';
import { ChangePasswordDto } from './dto/change-password';
@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private userService: UserService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async signUp({ name, email, password }: SignUpDto) {
    try {
      const findUser = await this.userService.findByEmail(email);
      if (findUser) throw new ConflictException('User already registered!');
      const hashPassword = await bcrypt.hash(password, 10);
      const newUser = await this.userModel.create({
        name,
        email,
        password: hashPassword,
        role: ROLE.SELLER,
      });
      const payload = { userId: newUser._id, email };
      const accessToken = this.jwtService.sign(payload);
      const refreshToken = this.jwtService.sign(payload, {
        secret: this.configService.get('JWT_REFRESH_SECRET'),
        expiresIn: '7d',
      });
      newUser.refreshTokens.push(refreshToken);
      await newUser.save();
      return {
        accessToken,
        refreshToken,
        user: getFields({
          object: newUser,
          fields: ['_id', 'name', 'email', 'status', 'verify', 'role'],
        }),
      };
    } catch (error) {
      console.log('SignUp error: ', error);
      throw error;
    }
  }

  async login({ email, password }: LoginDto) {
    const findUser = await this.userService.findByEmail(email);
    if (!findUser) throw new UnauthorizedException('Email not found!');
    const match = await bcrypt.compare(password, findUser.password);
    if (!match) throw new UnauthorizedException('Password is wrong!');
    const payload = { userId: findUser._id, email };
    const accessToken = this.jwtService.sign(payload);
    const refreshToken = this.jwtService.sign(payload, {
      secret: this.configService.get('JWT_REFRESH_SECRET'),
      expiresIn: '7d',
    });
    findUser.refreshTokens.push(refreshToken);
    await findUser.save();
    return {
      accessToken,
      refreshToken,
    };
  }

  logOut(userId: string, refreshToken: string) {
    return this.userModel.findByIdAndUpdate(userId, {
      $pull: {
        refreshTokens: refreshToken,
      },
    });
  }

  async handleRefreshToken(userId: string, refreshToken: string) {
    const user = await this.userService.findById(userId).lean();
    if (!user?.refreshTokens?.includes(refreshToken))
      throw new UnauthorizedException('Invalid refresh token!');
    const accessToken = this.jwtService.sign(
      {
        userId,
        email: user.email,
      },
      {
        secret: this.configService.get('JWT_REFRESH_SECRET'),
        expiresIn: '1d',
      },
    );
    return accessToken;
  }

  async changePassword(userId: string, { currentPassword, newPassword }: ChangePasswordDto) {
    if (currentPassword === newPassword)
      throw new BadRequestException('New password cannot be same as current password');
    const findUser = await this.userService.findById(userId);
    if (!findUser) throw new UnauthorizedException('User not found!');
    const match = await bcrypt.compare(currentPassword, findUser.password);
    if (!match) throw new UnauthorizedException('Current password is wrong!');
    findUser.password = await bcrypt.hash(newPassword, 10);
    findUser.refreshTokens = [];
    await findUser.save();
    return {
      message: 'Success',
    };
  }
}
