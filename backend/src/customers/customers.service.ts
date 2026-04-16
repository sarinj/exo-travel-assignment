import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ListCustomersQuery } from './dto/list-customers.query';
import { CustomerEntity } from './entities/customer.entity';

@Injectable()
export class CustomersService {
  constructor(
    @InjectRepository(CustomerEntity)
    private readonly customersRepository: Repository<CustomerEntity>,
  ) {}

  async list(query: ListCustomersQuery) {
    const search = (query.search ?? '').trim();
    const sortBy = query.sortBy ?? 'name';
    const order = query.order ?? 'asc';
    const page = query.page ?? 1;
    const limit = query.limit ?? 20;

    const queryBuilder = this.customersRepository
      .createQueryBuilder('customer')
      .leftJoinAndSelect('customer.recent_activity', 'recent_activity');

    if (search) {
      queryBuilder.andWhere(
        '(customer.name LIKE :search OR customer.company LIKE :search OR customer.salesperson LIKE :search)',
        { search: `%${search}%` },
      );
    }

    queryBuilder
      .orderBy(`customer.${sortBy}`, order.toUpperCase() as 'ASC' | 'DESC')
      .addOrderBy('customer.id', 'ASC')
      .skip((page - 1) * limit)
      .take(limit);

    const [items, total] = await queryBuilder.getManyAndCount();

    return {
      data: items.map((item) => ({
        ...item,
        recent_activity: [...(item.recent_activity ?? [])]
          .slice(0, 5)
          .map((activity) => ({
            action: activity.action,
            time: activity.time,
          })),
      })),
      meta: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async getById(id: number) {
    const item = await this.customersRepository.findOne({
      where: { id },
      relations: { recent_activity: true },
    });

    if (!item) {
      return null;
    }

    return {
      ...item,
      recent_activity: [...(item.recent_activity ?? [])]
        .slice(0, 5)
        .map((activity) => ({ action: activity.action, time: activity.time })),
    };
  }
}
