import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

enum UserRole {
  Admin = 'admin',
  Seller = 'seller',
  Buyer = 'buyer',
}

@Schema()
export class User extends Document {
  @Prop({ required: true })
  username: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({
    type: String,
    enum: Object.values(UserRole),
    default: UserRole.Admin,
  })
  role: UserRole;
}

export const UserSchema = SchemaFactory.createForClass(User);
