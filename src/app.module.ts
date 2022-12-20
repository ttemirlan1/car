import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CarsModule } from './cars/cars.module';
import { DB_CONFIG } from './utils/db.configs';
import { TariffModule } from './tariff/tariff.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [TypeOrmModule.forRoot(DB_CONFIG), CarsModule, TariffModule, AuthModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
