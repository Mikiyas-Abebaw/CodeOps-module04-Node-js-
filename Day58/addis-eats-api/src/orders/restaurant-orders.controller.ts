import {
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Header,
} from '@nestjs/common';

import { OrdersService } from './orders.service';

@Controller('restaurants')
export class RestaurantOrdersController {
  constructor(
    private readonly ordersService: OrdersService,
  ) {}

  @Get(':id/orders')
  @Header('Cache-Control', 'no-store')
  findByRestaurant(
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.ordersService.findByRestaurant(id);
  }
}