import { IsString, IsNotEmpty, IsNumber, IsArray } from 'class-validator';

export class CreateProductDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsNumber()
  minimumBidAmount: number;

  @IsArray()
  images: string[];
}
