import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({ name: 'cars' })
export class Cars {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  brand: string;
  @Column()
  model: string;
  @Column()
  plate: string;
  @Column()
  VIN: string;
}
