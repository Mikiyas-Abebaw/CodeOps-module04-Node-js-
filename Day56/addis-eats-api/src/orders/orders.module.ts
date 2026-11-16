import { Module } from '@nestjs/common';

import { OrdersController } from './orders.controller';
import { RestaurantOrdersController } from './restaurant-orders.controller';
import { OrdersService } from './orders.service';

@Module({
  controllers: [
    OrdersController,
    RestaurantOrdersController,
  ],
  providers: [OrdersService],
})
export class OrdersModule {}