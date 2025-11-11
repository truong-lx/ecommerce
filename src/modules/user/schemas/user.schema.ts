import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ROLE } from 'src/constants/role.enum';

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

  @Prop({ enum: [ROLE.ADMIN, ROLE.SELLER], default: ROLE.SELLER })
  role: ROLE.ADMIN | ROLE.SELLER;

  @Prop({ type: [String], default: [] })
  refreshTokens: string[];
}
export type UserDocument = User & Document;
export const UserSchema = SchemaFactory.createForClass(User);
