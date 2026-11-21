import {
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Query,
  Header,
} from '@nestjs/common';

import { RestaurantsService } from './restaurants.service';
import { FindRestaurantsQuery } from './dto/find-restaurants.query';
import { ParseAreaPipe } from '../common/pipes/parse-area.pipe';
import type { Area } from './restaurants.type';

@Controller('restaurants')
export class RestaurantsController {
  constructor(
    private readonly restaurantsService: RestaurantsService,
  ) {}

  @Get()
  @Header('Cache-Control', 'public, max-age=60')
  findAll(
    @Query() query: FindRestaurantsQuery,
    @Query('area', ParseAreaPipe) area?: Area,
  ) {
    // the pipe's normalised area replaces the raw string from the DTO
    return this.restaurantsService.findAll({ ...query, area });
  }

  @Get(':id/dishes/:dishId')
  findOneDish(
    @Param('id', ParseIntPipe) id: number,
    @Param('dishId', ParseIntPipe) dishId: number,
  ) {
    return this.restaurantsService.findOneRestaurantDish(id, dishId);
  }

  @Get(':id/dishes')
  findRestaurantDishes(
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.restaurantsService.findRestaurantDishes(id);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.restaurantsService.findOneRestaurant(id);
  }
}