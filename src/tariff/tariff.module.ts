import { Module } from '@nestjs/common';
import { TariffService } from './tariff.service';
import { TariffController } from './tariff.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tariff } from './entities/tariff.entity';
import { CarsService } from 'src/cars/cars.service';
import { CarsModule } from 'src/cars/cars.module';

@Module({
  imports: [TypeOrmModule.forFeature([Tariff]), CarsModule],
  //нужно что бы два модуля работали хорошо между собой
  controllers: [TariffController],
  providers: [TariffService],
})
export class TariffModule {}
