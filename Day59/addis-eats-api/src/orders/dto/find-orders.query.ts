import { Type } from 'class-transformer';
import {
  IsIn,
  IsInt,
  IsOptional,
  Max,
  Min,
} from 'class-validator';

import { AREAS } from '../../restaurants/restaurants.type';
import type { Area } from '../../restaurants/restaurants.type';

import { ORDER_STATUSES } from '../orders.type';
import type { OrderStatus } from '../orders.type';

export class FindOrdersQuery {
  @IsOptional()
  @IsIn([...ORDER_STATUSES])
  status?: OrderStatus;

  @IsOptional()
  @IsIn([...AREAS])
  area?: Area;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(50)
  limit: number = 20;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(0)
  offset: number = 0;

  @IsOptional()
  @IsIn(['customer', 'area', 'status'])
  sort: 'customer' | 'area' | 'status' = 'customer';
}