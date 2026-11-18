import { Area } from '../restaurants/restaurants.type';

export const ORDER_STATUSES = [
  'PENDING',
  'PREPARING',
  'READY',
  'COMPLETED',
  'CANCELLED',
] as const;

export type OrderStatus = (typeof ORDER_STATUSES)[number];

export interface Order {
  readonly id: number;
  customer: string;
  area: Area;
  status: OrderStatus;
  restaurantId: number;
  totalSantim: number;
}