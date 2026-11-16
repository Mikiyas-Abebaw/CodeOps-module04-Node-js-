import { IsIn } from 'class-validator';
import { ORDER_STATUSES, OrderStatus } from '../orders.type';

export class UpdateStatusDto {
  @IsIn([...ORDER_STATUSES])
  status: OrderStatus;
}