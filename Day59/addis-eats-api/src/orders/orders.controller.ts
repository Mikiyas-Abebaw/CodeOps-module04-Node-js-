
import {
  Controller,
  Get,
  Patch,
  Delete,
  Param,
  ParseIntPipe,
  Query,
  Body,
  HttpCode,
  HttpStatus,
  Header,
  Post,
} from '@nestjs/common';

import { CreateOrderDto } from './dto/create-order.dto';
import { OrdersService } from './orders.service';
import { FindOrdersQuery } from './dto/find-orders.query';
import { UpdateStatusDto } from './dto/update-status.dto';

@Controller('orders')
export class OrdersController {
  constructor(
    private readonly ordersService: OrdersService,
  ) {}

  @Get()
  @Header('Cache-Control', 'no-store')
  findAll(@Query() query: FindOrdersQuery) {
    return this.ordersService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.ordersService.findOne(id);
  }

  @Patch(':id/status')
  @Header('Cache-Control', 'no-store')
  updateStatus(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateStatusDto,
  ) {
    return this.ordersService.updateStatus(id, dto.status);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id', ParseIntPipe) id: number): void {
    this.ordersService.remove(id);
  }

  @Post()
  @Header('Cache-Control', 'no-store')
  create(@Body() dto: CreateOrderDto) {
    return this.ordersService.create(dto);
  }
}
