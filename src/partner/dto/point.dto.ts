import { IsArray, IsIn, ArrayMinSize } from 'class-validator';

export class GeoJsonPointDto {
  @IsIn(['Point'])
  type: 'Point';

  @IsArray()
  @ArrayMinSize(2)
  coordinates: [number, number];
}
