import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderItem } from './orderItem.entitiy';

@Module({
  imports: [TypeOrmModule.forFeature([OrderItem])],
})
export class OrderItemModule {}
