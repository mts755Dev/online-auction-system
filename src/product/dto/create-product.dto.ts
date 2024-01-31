import { IsEnum, IsNotEmpty, IsNumber, IsString, Min } from 'class-validator';
import { ProductStatus } from 'src/shared/constants/product-status';

export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsString()
  images: string;

  @IsNumber()
  @Min(0)
  minimumBid: number;

  @IsEnum(ProductStatus)
  @IsNotEmpty()
  status: ProductStatus;
}
