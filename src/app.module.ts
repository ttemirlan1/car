import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CarsModule } from './cars/cars.module';
import { DB_CONFIG } from './utils/db.configs';
import { TariffModule } from './tariff/tariff.module';

@Module({
  imports: [TypeOrmModule.forRoot(DB_CONFIG), CarsModule, TariffModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
