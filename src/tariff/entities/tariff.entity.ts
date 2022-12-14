import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Cars } from '../../cars/entities/car.entity';
import { SaleEnum } from '../enum/sale.enum';
import { TariffEnum } from '../enum/tariff.enum';

@Entity()
export class Tariff {
  @PrimaryGeneratedColumn()
  id: number;
  @OneToOne(() => Cars, (cars) => cars.id)
  @JoinColumn()
  car_id: number;
  @Column()
  tariff: TariffEnum;
  @Column()
  sales: SaleEnum;
  @Column()
  start: Date;
  @Column()
  end: Date;
}