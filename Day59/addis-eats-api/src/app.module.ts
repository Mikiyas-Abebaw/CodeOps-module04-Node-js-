import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RestaurantsModule } from './restaurants/restaurants.module';
import { DishesModule } from './dishes/dishes.module';
import { OrdersModule } from './orders/orders.module';
import { RequestIdMiddleware } from './common/middleware/request-id.middleware';
import { ApiKeyGuard } from './common/guards/api-key.guard';
import { LoggingInterceptor } from './common/interceptors/logging.interceptor';
import { TimeoutInterceptor } from './common/interceptors/timeout.interceptor';

@Module({
  imports: [RestaurantsModule, DishesModule, OrdersModule,  ConfigModule.forRoot({ isGlobal: true }),],
  controllers: [AppController],
  providers: [
    AppService,
    { provide: APP_GUARD, useClass: ApiKeyGuard },
    { provide: APP_INTERCEPTOR, useClass: LoggingInterceptor },
    { provide: APP_INTERCEPTOR, useClass: TimeoutInterceptor },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(RequestIdMiddleware).forRoutes('*');
  }
}