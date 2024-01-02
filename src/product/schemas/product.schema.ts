import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Product extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  minimumBidAmount: number;

  @Prop({ type: [String] })
  images: string[];

  @Prop({ enum: ['live', 'sold', 'delivered'], default: 'live' })
  status: string;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
