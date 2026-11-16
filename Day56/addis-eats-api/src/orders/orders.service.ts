import { Injectable, NotFoundException } from '@nestjs/common';

import { ORDERS } from './orders.mock';
import { Order, OrderStatus } from './orders.type';
import { FindOrdersQuery } from './dto/find-orders.query';
import { Page } from '../common/page.type';
import { SEED } from '../restaurants/restaurants.mock';
import { CreateOrderDto } from './dto/create-order.dto';

@Injectable()
export class OrdersService {
  findAll(query: FindOrdersQuery): Page<Order> {
    let rows = [...ORDERS];

    if (query.status) {
      rows = rows.filter((order) => order.status === query.status);
    }

    if (query.area) {
      rows = rows.filter((order) => order.area === query.area);
    }

    rows.sort((a, b) =>
      a[query.sort].localeCompare(b[query.sort]),
    );

    const total = rows.length;
    const items = rows.slice(
      query.offset,
      query.offset + query.limit,
    );

    return {
      items,
      total,
      limit: query.limit,
      offset: query.offset,
    };
  }

  findPending(): Page<Order> {
    const items = ORDERS.filter((order) => order.status === 'PENDING');

    return {
      items,
      total: items.length,
      limit: items.length,
      offset: 0,
    };
  }

  findOne(id: number): Order {
    const order = ORDERS.find((order) => order.id === id);

    if (!order) {
      throw new NotFoundException('Order not found');
    }

    return order;
  }

  updateStatus(id: number, status: OrderStatus): Order {
    const order = this.findOne(id);
    order.status = status;
    return order;
  }

  findByRestaurant(restaurantId: number): Page<Order> {
    const restaurant = SEED.find((r) => r.id === restaurantId);

    if (!restaurant) {
      throw new NotFoundException('Restaurant not found');
    }

    const items = ORDERS.filter(
      (order) => order.restaurantId === restaurantId,
    );

    return {
      items,
      total: items.length,
      limit: items.length,
      offset: 0,
    };
  }

  remove(id: number): void {
    const index = ORDERS.findIndex((order) => order.id === id);

    if (index === -1) {
      throw new NotFoundException('Order not found');
    }

    ORDERS.splice(index, 1);
  }
}