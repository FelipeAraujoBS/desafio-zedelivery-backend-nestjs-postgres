import {
  IsString,
  IsObject,
  IsNotEmpty,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { GeoJsonMultiPolygonDto } from './polygon.dto';
import { GeoJsonPointDto } from './point.dto';

export class CreatePartnerDto {
  @IsString()
  @IsNotEmpty()
  tradingName: string;

  @IsString()
  @IsNotEmpty()
  ownerName: string;

  @IsString()
  @IsNotEmpty()
  document: string;

  @IsObject()
  @ValidateNested()
  @Type(() => GeoJsonMultiPolygonDto)
  coverageArea: GeoJsonMultiPolygonDto;

  @IsObject()
  @ValidateNested()
  @Type(() => GeoJsonPointDto)
  address: GeoJsonPointDto;
}
