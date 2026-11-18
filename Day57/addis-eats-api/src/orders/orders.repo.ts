
import { Injectable, NotFoundException } from '@nestjs/common';

import { ORDERS } from './orders.mock';
import { Order, OrderStatus } from './orders.type';
import { CreateOrderDto } from './dto/create-order.dto';

@Injectable()
export class OrdersRepository {
  findAll(): Order[] {
    return [...ORDERS];
  }

  findOne(id: number): Order | undefined {
    return ORDERS.find((order) => order.id === id);
  }

  create(dto: CreateOrderDto): Order {
    const newOrder: Order = {
      id: Math.max(0, ...ORDERS.map((order) => order.id)) + 1,
      customer: dto.customer,
      area: dto.area,
      status: 'PENDING',
      restaurantId: dto.restaurantId,
      totalSantim: dto.totalSantim,
    };

    ORDERS.push(newOrder);

    return newOrder;
  }

  updateStatus(id: number, status: OrderStatus): Order {
    const order = this.findOne(id);

    if (!order) {
      throw new NotFoundException('Order not found');
    }

    order.status = status;

    return order;
  }

  remove(id: number): void {
    const index = ORDERS.findIndex((order) => order.id === id);

    if (index === -1) {
      throw new NotFoundException('Order not found');
    }

    ORDERS.splice(index, 1);
  }
}
