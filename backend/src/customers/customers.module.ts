import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CustomersController } from './customers.controller';
import { CustomersService } from './customers.service';
import { CustomerEntity } from './entities/customer.entity';
import { RecentActivityEntity } from './entities/recent-activity.entity';
import { CustomerSeedService } from '../database/customer-seed.service';

@Module({
  imports: [TypeOrmModule.forFeature([CustomerEntity, RecentActivityEntity])],
  controllers: [CustomersController],
  providers: [CustomersService, CustomerSeedService],
  exports: [TypeOrmModule],
})
export class CustomersModule {}
