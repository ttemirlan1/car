import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsEnum } from 'class-validator';
import { SaleEnum } from '../enum/sale.enum';
import { TariffEnum } from '../enum/tariff.enum';

export class CreateTariffDto {
  @ApiProperty()
  car_id: number;
  @ApiProperty()
  @IsEnum(TariffEnum)
  tariff: TariffEnum;
  @ApiProperty()
  @IsEnum(SaleEnum)
  sales: SaleEnum;
  @ApiProperty()
  @IsDate()
  start: Date;
  @ApiProperty()
  @IsDate()
  end: Date;
}
