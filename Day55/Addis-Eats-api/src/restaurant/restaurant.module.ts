import { Module } from '@nestjs/common';
import { RestaurantController } from './restaurant.controller';
import { RestaurantService } from './restaurant.service';

@Module({
  controllers: [RestaurantController],
  providers: [
  RestaurantsService,
  { provide: RESTAURANT_REPOSITORY,
    useClass: InMemoryRestaurantRepository },
]

})
export class RestaurantModule {}
