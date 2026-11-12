
export const AREAS = ["Bole", "Piassa", "Kazanchis", "Megenagna"] as const;
export type Area = (typeof AREAS)[number];
 
export const ORDER_STATUSES = [
  "pending",
  "confirmed",
  "preparing",
  "out_for_delivery",
  "delivered",
] as const;
export type OrderStatus = (typeof ORDER_STATUSES)[number];
 
export type Dish = {
  name: string;
  price: number; // santim
};
 
export type Order = {
  readonly id: number;
  customer: string;
  area: Area;
  status: OrderStatus;
  dishes: Dish[];
  phone?: string;
  total: number; // santim
};
 