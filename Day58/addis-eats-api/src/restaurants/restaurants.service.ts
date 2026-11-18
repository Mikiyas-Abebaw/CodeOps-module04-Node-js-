import { Injectable, NotFoundException } from '@nestjs/common';
import { DishesService } from '../dishes/dishes.service';
import { SEED } from './restaurants.mock';
import { FindRestaurantsQuery } from './dto/find-restaurants.query';
import { Page } from '../common/page.type';

@Injectable()
export class RestaurantsService {
  constructor(
    private readonly dishesService: DishesService,
  ) {}

  findAll(query: FindRestaurantsQuery): Page<any> {
    let rows = [...SEED];

    if (query.area) {
      rows = rows.filter((r) => r.area === query.area);
    }

    if (query.isOpen !== undefined) {
      rows = rows.filter((r) => r.isOpen === query.isOpen);
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

 

  findRestaurantDishes(restaurantId: number) {
    this.findOneRestaurant(restaurantId);

    const items = this.dishesService.findByRestaurant(restaurantId);

    return {
      items,
      total: items.length,
      limit: items.length,
      offset: 0,
    };
  }

  findOneRestaurantDish(restaurantId: number, dishId: number) {
    this.findOneRestaurant(restaurantId);
    return this.dishesService.findOne(restaurantId, dishId);
  }

  findOneRestaurant(id: number) {
    const restaurant = SEED.find((r) => r.id === id);

    if (!restaurant) {
      throw new NotFoundException('Restaurant not found');
    }

    return restaurant;
  }
}