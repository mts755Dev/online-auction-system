import {
  IsArray,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsString,
  Min,
} from 'class-validator';

enum ProductStatus {
  Live = 'live',
  Sold = 'sold',
  Delivered = 'delivered',
}

export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsArray()
  images: string[];

  @IsNumber()
  @Min(0)
  minimumBid: number;

  @IsEnum(ProductStatus)
  @IsNotEmpty()
  status: ProductStatus;
}
