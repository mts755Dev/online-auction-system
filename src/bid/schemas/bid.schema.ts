import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Bid extends Document {
  @Prop({ required: true })
  productId: string;

  @Prop({ required: true })
  buyerId: string;

  @Prop({ required: true })
  amount: number;
}

export const BidSchema = SchemaFactory.createForClass(Bid);
