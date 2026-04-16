import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { RecentActivityEntity } from './recent-activity.entity';

@Entity({ name: 'customers' })
export class CustomerEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text' })
  name: string;

  @Column({ type: 'text' })
  company: string;

  @Column({ type: 'text' })
  initials: string;

  @Column({ type: 'text' })
  active_since: string;

  @Column({ type: 'text', unique: true })
  email: string;

  @Column({ type: 'text' })
  phone: string;

  @Column({ type: 'text' })
  salesperson: string;

  @Column({ type: 'text' })
  credit_status: string;

  @Column({ type: 'text' })
  status: string;

  @Column({ type: 'integer' })
  total_spend: number;

  @Column({ type: 'integer' })
  number_of_purchases: number;

  @Column({ type: 'text' })
  last_activity: string;

  @OneToMany(() => RecentActivityEntity, (activity) => activity.customer, {
    cascade: true,
  })
  recent_activity: RecentActivityEntity[];
}
