import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({
  timestamps: true,
  collection: 'Users',
})
export class User {
  @Prop({ trim: true, maxLength: 150 })
  name: string;

  @Prop({ unique: true, trim: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ enum: ['active', 'inactive'], default: 'inactive' })
  status: 'active' | 'inactive';

  @Prop({ default: false })
  verify: boolean;

  @Prop({ enum: ['ADMIN', 'SELLER'], default: 'SELLER' })
  role: 'ADMIN' | 'SELLER';

  @Prop({ type: [String], default: [] })
  refreshTokens: string[];

  @Prop({ type: [String], default: [] })
  refreshTokensUsed: string[];
}
export type UserDocument = User & Document;
export const UserSchema = SchemaFactory.createForClass(User);
