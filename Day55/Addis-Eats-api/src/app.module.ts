import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { OrdersModule } from './orders/orders.module';
import { RestaurantModule } from './restaurant/restaurant.module';

@Module({
  imports: [OrdersModule, RestaurantModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
