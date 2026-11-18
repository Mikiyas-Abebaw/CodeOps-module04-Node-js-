import { Injectable, NotFoundException } from '@nestjs/common';
import { DISHES } from './dishes.mock';

@Injectable()
export class DishesService {
  findByRestaurant(restaurantId: number) {
    const dishes = DISHES.filter(
      (dish) => dish.restaurantId === restaurantId,
    );

    return dishes;
  }

  findOne(restaurantId: number, dishId: number) {
    const dish = DISHES.find(
      (dish) =>
        dish.id === dishId &&
        dish.restaurantId === restaurantId,
    );

    if (!dish) {
      throw new NotFoundException('Dish not found in this restaurant');
    }

    return dish;
  }
}