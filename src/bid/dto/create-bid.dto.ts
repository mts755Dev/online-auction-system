import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateBidDto {
  @IsString()
  @IsNotEmpty()
  userId: string;

  @IsString()
  @IsNotEmpty()
  productId: string;

  @IsNumber()
  @IsNotEmpty()
  amount: number;
}
