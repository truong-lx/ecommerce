import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './user.schema';
import { Model, UpdateQuery } from 'mongoose';

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

  create(user: Partial<User>) {
    return this.userModal.create(user);
  }

  findByIdAndUpdate(userId: string, data: UpdateQuery<User>) {
    return this.userModal.findByIdAndUpdate(userId, data, {
      new: true,
    });
  }
}
