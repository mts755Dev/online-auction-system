import { IsString, IsNotEmpty } from 'class-validator';

export class CreateBuyerDto {
  @IsNotEmpty()
  @IsString()
  username: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}
