import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CustomerEntity } from '../customers/entities/customer.entity';
import { RecentActivityEntity } from '../customers/entities/recent-activity.entity';

const FIRST_NAMES = [
  'John',
  'Jane',
  'Michael',
  'Sarah',
  'David',
  'Emily',
  'Daniel',
  'Olivia',
  'James',
  'Sophia',
];
const LAST_NAMES = [
  'Smith',
  'Johnson',
  'Brown',
  'Taylor',
  'Anderson',
  'Thomas',
  'Jackson',
  'White',
  'Harris',
  'Martin',
];
const COMPANIES = [
  'Acme Corp',
  'Northwind',
  'Blue Peak',
  'Vertex Group',
  'Summit Labs',
  'Harbor Co',
  'Greenline',
  'Atlas Studio',
];
const SALESPEOPLE = [
  'Jane White',
  'Robert King',
  'Maria Chen',
  'Daniel Brooks',
  'Ava Patel',
];
const CREDIT_STATUSES = ['No Credit', 'Limited Credit', 'Good Standing'];
const ACTIONS = [
  'Generated Report',
  'Received Email',
  'Subscribed Promotion',
  'Updated Profile',
  'Updated Billing',
];

@Injectable()
export class CustomerSeedService implements OnApplicationBootstrap {
  constructor(
    @InjectRepository(CustomerEntity)
    private readonly customerRepository: Repository<CustomerEntity>,
    @InjectRepository(RecentActivityEntity)
    private readonly activityRepository: Repository<RecentActivityEntity>,
  ) {}

  async onApplicationBootstrap() {
    const existingCount = await this.customerRepository.count();
    if (existingCount > 0) {
      return;
    }

    const customers: CustomerEntity[] = [];
    for (let index = 0; index < 1000; index += 1) {
      const id = index + 1;
      const firstName = FIRST_NAMES[index % FIRST_NAMES.length];
      const lastName = LAST_NAMES[(index * 3) % LAST_NAMES.length];
      const name = `${firstName} ${lastName}`;
      const company = COMPANIES[index % COMPANIES.length];
      const activeSince = `${2021 + (index % 5)}-${String((index % 12) + 1).padStart(2, '0')}-${String((index % 28) + 1).padStart(2, '0')}`;
      const customer = this.customerRepository.create({
        id,
        name,
        company,
        initials: `${firstName[0]}${lastName[0]}`,
        active_since: activeSince,
        email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}${id}@mail.com`,
        phone: `02-${String(3000 + (index % 6000)).padStart(4, '0')}-${String(7000 + (index % 1000)).padStart(4, '0')}`,
        salesperson: SALESPEOPLE[index % SALESPEOPLE.length],
        credit_status: CREDIT_STATUSES[index % CREDIT_STATUSES.length],
        status: index % 7 === 0 ? 'Inactive' : 'Active',
        total_spend: 1200 + index * 125,
        number_of_purchases: 5 + (index % 300),
        last_activity: new Date(
          Date.UTC(2026, index % 12, (index % 28) + 1, 10, 30, 0),
        ).toISOString(),
      });
      customers.push(customer);
    }

    const savedCustomers = await this.customerRepository.save(customers);

    const activities: RecentActivityEntity[] = [];
    for (const customer of savedCustomers) {
      for (let i = 0; i < 5; i += 1) {
        const activity = this.activityRepository.create({
          action: ACTIONS[i],
          time: `${i + 1} hour${i === 0 ? '' : 's'} ago`,
          customer,
        });
        activities.push(activity);
      }
    }

    await this.activityRepository.save(activities);
  }
}
