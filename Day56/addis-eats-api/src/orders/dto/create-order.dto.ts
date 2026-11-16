import { Type } from 'class-transformer';
import {IsIn,IsInt,IsNotEmpty,IsString,MaxLength,Min,} from 'class-validator';

import { AREAS, Area } from '../../restaurants/restaurants.type';

export class CreateOrderDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  customer: string;

  @IsIn([...AREAS])
  area: Area;

  @Type(() => Number)
  @IsInt()
  @Min(1)
  restaurantId: number;

  @Type(() => Number)
  @IsInt()
  @Min(0)
  totalSantim: number;
}