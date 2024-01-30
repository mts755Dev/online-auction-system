import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { AuctionStatus } from 'src/shared/constants/auction-status';

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
    enum: AuctionStatus,
    default: AuctionStatus.Pending,
  })
  status: AuctionStatus;
}

export const AuctionSchema = SchemaFactory.createForClass(Auction);
