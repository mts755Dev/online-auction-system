import { IsString, IsNotEmpty } from 'class-validator';

export class CreateSellerDto {
  @IsNotEmpty()
  @IsString()
  username: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}
