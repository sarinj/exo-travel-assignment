import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthController } from './auth/auth.controller';
import { CustomersModule } from './customers/customers.module';
import { CustomerEntity } from './customers/entities/customer.entity';
import { RecentActivityEntity } from './customers/entities/recent-activity.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'customer-management.sqlite',
      entities: [CustomerEntity, RecentActivityEntity],
      synchronize: true,
    }),
    CustomersModule,
  ],
  controllers: [AuthController],
  providers: [],
})
export class AppModule {}
