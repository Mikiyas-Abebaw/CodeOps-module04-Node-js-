import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import type { Order } from './orders.type';
import type { OrderStatus } from './orders.type';
import { OrdersRepository } from './orders.repo';
import { FindOrdersQuery } from './dto/find-orders.query';
import { Page } from '../common/page.type';
import { SEED } from '../restaurants/restaurants.mock';
import { CreateOrderDto } from './dto/create-order.dto';

const ALLOWED: Record<OrderStatus, readonly OrderStatus[]> = {
  PENDING: ['PREPARING', 'CANCELLED'],
  PREPARING: ['READY', 'CANCELLED'],
  READY: ['COMPLETED'],
  COMPLETED: [],
  CANCELLED: [],
};

@Injectable()
export class OrdersService {
  constructor(private readonly ordersRepo: OrdersRepository) {}

  findAll(query: FindOrdersQuery): Page<Order> {
    let rows = this.ordersRepo.findAll();

    if (query.status) {
      rows = rows.filter((order) => order.status === query.status);
    }

    if (query.area) {
      rows = rows.filter((order) => order.area === query.area);
    }

    if (query.sort === 'customer') {
      rows.sort((a, b) => a.customer.localeCompare(b.customer));
    } else if (query.sort === 'area') {
      rows.sort((a, b) => a.area.localeCompare(b.area));
    } else if (query.sort === 'status') {
      rows.sort((a, b) => a.status.localeCompare(b.status));
    }

    const total = rows.length;
    const items = rows.slice(query.offset, query.offset + query.limit);

    return {
      items,
      total,
      limit: query.limit,
      offset: query.offset,
    };
  }

  findOne(id: number): Order {
    const order = this.ordersRepo.findOne(id);

    if (!order) {
      throw new NotFoundException('Order not found');
    }

    return order;
  }

  create(dto: CreateOrderDto): Order {
    // 1 - existence first (404)
    const restaurant = SEED.find((r) => r.id === dto.restaurantId);

    if (!restaurant) {
      throw new NotFoundException('Restaurant not found');
    }

    // 2 - state of what we found (409)
    if (!restaurant.isOpen) {
      throw new ConflictException('Restaurant is closed');
    }

    // 3 - only now do the work
    return this.ordersRepo.create(dto);
  }

  updateStatus(id: number, status: OrderStatus): Order {
    const order = this.findOne(id); // throws 404 if missing

    if (!ALLOWED[order.status].includes(status)) {
      throw new ConflictException(
        `Cannot change order status from ${order.status} to ${status}`,
      );
    }

    return this.ordersRepo.updateStatus(id, status);
  }

  findByRestaurant(restaurantId: number): Page<Order> {
    const restaurant = SEED.find((r) => r.id === restaurantId);

    if (!restaurant) {
      throw new NotFoundException('Restaurant not found');
    }

    const items = this.ordersRepo
      .findAll()
      .filter((order) => order.restaurantId === restaurantId);

    return {
      items,
      total: items.length,
      limit: items.length,
      offset: 0,
    };
  }

  remove(id: number): void {
    this.ordersRepo.remove(id);
  }
}