
import type { Order } from "./orders.type";

export const ORDERS: Order[] = [
  { id: 1, customer: "Abebe", area: "Bole", status: "PENDING", restaurantId: 1, totalSantim: 28000 },
  { id: 2, customer: "Selam", area: "Piassa", status: "COMPLETED", restaurantId: 4, totalSantim: 13500 },
  { id: 3, customer: "Meron", area: "Kazanchis", status: "PREPARING", restaurantId: 3, totalSantim: 34500 },
  { id: 4, customer: "Dawit", area: "Megenagna", status: "PENDING", restaurantId: 1, totalSantim: 45000 },
  { id: 5, customer: "Hanna", area: "Bole", status: "READY", restaurantId: 2, totalSantim: 60000 },
  { id: 6, customer: "Yonas", area: "Piassa", status: "COMPLETED", restaurantId: 4, totalSantim: 18000 },
  { id: 7, customer: "Tigist", area: "Kazanchis", status: "PENDING", restaurantId: 3, totalSantim: 23500 },
  { id: 8, customer: "Bereket", area: "Megenagna", status: "COMPLETED", restaurantId: 1, totalSantim: 27000 },
  { id: 9, customer: "Rahel", area: "Bole", status: "PENDING", restaurantId: 1, totalSantim: 50500 },
  { id: 10, customer: "Samuel", area: "Piassa", status: "PREPARING", restaurantId: 4, totalSantim: 32000 },
  { id: 11, customer: "Liya", area: "Kazanchis", status: "READY", restaurantId: 3, totalSantim: 41500 },
  { id: 12, customer: "Kidus", area: "Megenagna", status: "PENDING", restaurantId: 1, totalSantim: 52000 },
];
