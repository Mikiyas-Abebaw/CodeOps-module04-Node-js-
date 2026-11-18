
import { Module } from '@nestjs/common';

import { OrdersController } from './orders.controller';
import { RestaurantOrdersController } from './restaurant-orders.controller';
import { OrdersService } from './orders.service';
import { OrdersRepository } from './orders.repo';
@Module({
  controllers: [
    OrdersController,
    RestaurantOrdersController,
  ],
 providers: [OrdersService, OrdersRepository],
})
export class OrdersModule {}