import { IsIn } from 'class-validator';
import { ORDER_STATUSES } from '../orders.type';
import type { OrderStatus } from '../orders.type';

export class UpdateStatusDto {
  @IsIn([...ORDER_STATUSES])
  status: OrderStatus;
}