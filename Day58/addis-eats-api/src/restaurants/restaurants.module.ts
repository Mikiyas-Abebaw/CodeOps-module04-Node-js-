import { Module } from '@nestjs/common';
import { RestaurantsService } from './restaurants.service';
import { RestaurantsController } from './restaurants.controller';
import { DishesModule } from '../dishes/dishes.module';


@Module({
  imports:[DishesModule],
  providers: [RestaurantsService],
  controllers: [RestaurantsController]
})
export class RestaurantsModule {}
