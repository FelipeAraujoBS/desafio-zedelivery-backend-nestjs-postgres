import { IsNumber, IsNotEmpty } from 'class-validator';
import { Type } from 'class-transformer';

export class SearchPartnerDto {
  @IsNotEmpty()
  @IsNumber()
  @Type(() => Number)
  long: number;

  @IsNotEmpty()
  @IsNumber()
  @Type(() => Number)
  lat: number;
}
