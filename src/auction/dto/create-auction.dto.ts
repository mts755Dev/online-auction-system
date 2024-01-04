import {
  IsDateString,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsString,
  Min,
} from 'class-validator';

enum AuctionStatus {
  Pending = 'pending',
  Approved = 'approved',
  Rejected = 'rejected',
}

export class CreateAuctionDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsDateString()
  @IsNotEmpty()
  startDateTime: Date;

  @IsDateString()
  @IsNotEmpty()
  endDateTime: Date;

  @IsNumber()
  @IsNotEmpty()
  @Min(0)
  minimumBid: number;

  @IsEnum(AuctionStatus)
  @IsNotEmpty()
  status: AuctionStatus;
}
