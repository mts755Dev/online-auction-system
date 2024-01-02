import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateBidDto {
  @IsNotEmpty()
  bidderId: string;

  @IsNotEmpty()
  auctionId: string;

  @IsNotEmpty()
  @IsNumber()
  bidAmount: number;
}
