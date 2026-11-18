import { Type } from 'class-transformer';
import {
  ArrayNotEmpty,
  IsArray,
  IsIn,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  Min,
  Validate,
  ValidateNested,
} from 'class-validator';

import { AREAS } from '../../restaurants/restaurants.type';
import type { Area } from '../../restaurants/restaurants.type';
import { IsSantimConstraint } from '../../common/validators/is-santim.constraint';
import { IsTeleBirrNumber } from '../../common/validators/is-telebirr-number.validator';
import { OrderLineDto } from './order-line.dto';

export class CreateOrderDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  customer: string;

  @IsOptional()
  @IsTeleBirrNumber()
  phone?: string;

  @IsIn([...AREAS])
  area: Area;

  @Type(() => Number)
  @IsInt()
  @Min(1)
  restaurantId: number;

  @Validate(IsSantimConstraint)
  totalSantim: number;

  @IsArray()
  @ArrayNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => OrderLineDto)
  lines: OrderLineDto[];
}