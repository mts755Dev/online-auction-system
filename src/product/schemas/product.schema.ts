import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, SchemaTypes, Types } from 'mongoose';
import { Bid } from 'src/bid/schemas/bid.schema';
import { ProductStatus } from 'src/shared/constants/product-status';
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

  @Prop({ type: String, enum: ProductStatus, default: ProductStatus.LIVE })
  status: ProductStatus.LIVE;

  @Prop({ type: [{ type: SchemaTypes.ObjectId, ref: 'Bid' }] })
  bids: Types.ObjectId[] | Bid[];

  @Prop({ type: SchemaTypes.ObjectId, ref: 'User', required: true })
  sellerId: Types.ObjectId | User;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
