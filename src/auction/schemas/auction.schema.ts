import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Auction extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({ type: Date, required: true })
  startDateTime: Date;

  @Prop({ type: Date, required: true })
  endDateTime: Date;

  @Prop({ required: true })
  minimumBid: number;

  @Prop({
    type: String,
    enum: ['pending', 'approved', 'completed'],
    default: 'pending',
  })
  status: 'pending' | 'approved' | 'completed';
}

export const AuctionSchema = SchemaFactory.createForClass(Auction);
