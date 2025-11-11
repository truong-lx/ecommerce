import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './schemas/user.schema';
import { Model } from 'mongoose';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModal: Model<UserDocument>) {}

  findByEmail(
    email: string,
    select = {
      email: 1,
      password: 1,
      name: 1,
      status: 1,
      role: 1,
      refreshTokens: 1,
    },
  ) {
    return this.userModal.findOne({ email }).select(select);
  }

  findById(id: string) {
    return this.userModal.findById(id);
  }
}
