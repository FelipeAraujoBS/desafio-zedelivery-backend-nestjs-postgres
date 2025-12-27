import { IsArray, IsIn, ArrayMinSize } from 'class-validator';

export class GeoJsonMultiPolygonDto {
  @IsIn(['MultiPolygon'])
  type: 'MultiPolygon';

  @IsArray()
  @ArrayMinSize(1)
  coordinates: number[][][][];
}
