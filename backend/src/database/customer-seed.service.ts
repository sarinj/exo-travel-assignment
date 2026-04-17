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

function randomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomItem<T>(items: T[]): T {
  return items[randomInt(0, items.length - 1)];
}

function randomDateString(startYear: number, endYear: number): string {
  const year = randomInt(startYear, endYear);
  const month = randomInt(1, 12);
  const day = randomInt(1, 28);
  return `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
}

function randomRecentIsoDate(daysBack: number): string {
  const now = new Date();
  const offsetMs = randomInt(1, daysBack * 24 * 60 * 60) * 1000;
  return new Date(now.getTime() - offsetMs).toISOString();
}

function formatTimeAgo(totalMinutes: number): string {
  if (totalMinutes < 60) {
    return `${totalMinutes} minute${totalMinutes === 1 ? '' : 's'} ago`;
  }

  const hours = Math.floor(totalMinutes / 60);
  if (hours < 24) {
    return `${hours} hour${hours === 1 ? '' : 's'} ago`;
  }

  const days = Math.floor(hours / 24);
  if (days < 30) {
    return `${days} day${days === 1 ? '' : 's'} ago`;
  }

  const months = Math.floor(days / 30);
  return `${months} month${months === 1 ? '' : 's'} ago`;
}

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
      const firstName = randomItem(FIRST_NAMES);
      const lastName = randomItem(LAST_NAMES);
      const name = `${firstName} ${lastName}`;
      const numberOfPurchases = randomInt(1, 320);
      const totalSpend =
        numberOfPurchases * randomInt(90, 850) + randomInt(0, 999);
      const customer = this.customerRepository.create({
        name,
        company: randomItem(COMPANIES),
        initials: `${firstName[0]}${lastName[0]}`,
        active_since: randomDateString(2020, 2026),
        email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}${id}@mail.com`,
        phone: `02-${String(randomInt(2000, 9999))}-${String(randomInt(1000, 9999))}`,
        salesperson: randomItem(SALESPEOPLE),
        credit_status: randomItem(CREDIT_STATUSES),
        status: Math.random() < 0.82 ? 'Active' : 'Inactive',
        total_spend: totalSpend,
        number_of_purchases: numberOfPurchases,
        last_activity: randomRecentIsoDate(180),
      });
      customers.push(customer);
    }

    const savedCustomers = await this.customerRepository.save(customers);

    const activities: RecentActivityEntity[] = [];
    for (const customer of savedCustomers) {
      const activityCount = randomInt(3, 8);
      const offsetsInMinutes = Array.from({ length: activityCount }, () =>
        randomInt(5, 60 * 24 * 120),
      ).sort((a, b) => a - b);

      for (let i = 0; i < activityCount; i += 1) {
        const activity = this.activityRepository.create({
          action: randomItem(ACTIONS),
          // Smaller offsets are newer, so this seeds most-recent to oldest.
          time: formatTimeAgo(offsetsInMinutes[i]),
          customer,
        });
        activities.push(activity);
      }
    }

    await this.activityRepository.save(activities);
  }
}
