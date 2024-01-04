import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, SchemaTypes, Types } from 'mongoose';
import { User } from 'src/user/schemas/user.schema';

@Schema()
export class Product extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  description: string;

  @Prop({ type: [String] })
  images: string[];

  @Prop({ required: true })
  minimumBid: number;

  @Prop({ type: String, enum: ['live', 'sold', 'delivered'], default: 'live' })
  status: 'live' | 'sold' | 'delivered';

  @Prop({ type: SchemaTypes.ObjectId, ref: 'User', required: true })
  sellerId: Types.ObjectId | User;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
