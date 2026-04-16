import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { CustomerEntity } from './customer.entity';

@Entity({ name: 'recent_activities' })
export class RecentActivityEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text' })
  action: string;

  @Column({ type: 'text' })
  time: string;

  @ManyToOne(() => CustomerEntity, (customer) => customer.recent_activity, {
    onDelete: 'CASCADE',
  })
  customer: CustomerEntity;
}
