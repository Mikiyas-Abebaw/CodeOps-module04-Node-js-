
import { Controller,Get,Param,ParseIntPipe,} from '@nestjs/common';

import { RestaurantsService } from './restaurants.service';

@Controller('restaurants')
export class RestaurantsController {
  constructor(
    private readonly restaurantsService: RestaurantsService,
  ) {}

  @Get('open')
  findOpenRestaurants() {
  return this.restaurantsService.findOpenRestaurants();
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
}
