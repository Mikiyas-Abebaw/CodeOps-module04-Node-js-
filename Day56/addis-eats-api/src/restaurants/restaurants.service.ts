import { Injectable, NotFoundException } from '@nestjs/common';
import { DishesService } from '../dishes/dishes.service';
import { SEED } from './restaurants.mock';

@Injectable()
export class RestaurantsService {
  constructor(
    private readonly dishesService: DishesService,
  ) {}

  findOpenRestaurants() {
    return SEED.filter((restaurant) => restaurant.isOpen);
  }

  findRestaurantDishes(restaurantId: number) {
    const restaurant = SEED.find(
      (restaurant) => restaurant.id === restaurantId,
    );

    if (!restaurant) {
      throw new NotFoundException('Restaurant not found');
    }

    return this.dishesService.findByRestaurant(restaurantId);
  }

  findOneRestaurantDish(restaurantId: number, dishId: number) {
    const restaurant = SEED.find(
      (restaurant) => restaurant.id === restaurantId,
    );

    if (!restaurant) {
      throw new NotFoundException('Restaurant not found');
    }

    return this.dishesService.findOne(restaurantId, dishId);
  }
}