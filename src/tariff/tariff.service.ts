import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateTariffDto } from './dto/create-tariff.dto';
import { Tariff } from './entities/tariff.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Cars } from 'src/cars/entities/car.entity';
import { CarsService } from 'src/cars/cars.service';
import { PassportModule } from '@nestjs/passport';
import { TariffEnum } from './enum/tariff.enum';
import { SaleEnum } from './enum/sale.enum';

@Injectable()
export class TariffService {
  constructor(
    @InjectRepository(Tariff)
    private tariffRepo: Repository<Tariff>,
    private carService: CarsService,
  ) {}
  async create(createTariffDto: CreateTariffDto) {
    const car = await this.carService.findOne(createTariffDto.car_id);
    const diffDays = await this.findDifDays(
      createTariffDto.start,
      createTariffDto.end,
    );
    if (diffDays > 30) throw new BadRequestException('ограничегие по дням');
    if (
      createTariffDto.start.getDay() == 0 ||
      createTariffDto.start.getDate() == 6
    )
      throw new BadRequestException('выходные дни');
    if (createTariffDto.end.getDay() == 0 || createTariffDto.end.getDate() == 6)
      throw new BadRequestException('выходные дни');
    const isEnable = await this.findLastOrder(
      createTariffDto.car_id,
      createTariffDto.start,
    );
    if (!isEnable) throw new BadRequestException('Пауза не соблюдена');
    const calculated = await this.calculate(
      createTariffDto.start,
      createTariffDto.end,
      createTariffDto.tariff,
    );
    await this.tariffRepo.save(createTariffDto);
    return calculated;
  }
  async findAll() {
    return await this.tariffRepo.find();
  }

  async findActive() {
    const cars = await this.tariffRepo.find({ where: { end: new Date() } });
    cars.sort();
    return cars;
  }

  async remove(id: number) {
    return await `This action removes a #${id} tariff`;
  }

  private async findLastOrder(id: number, start: Date): Promise<boolean> {
    const car = await this.tariffRepo.find({ where: { car_id: id } });
    const lastOrder = car[car.length - 1];
    const diffDays = await this.findDifDays(start, lastOrder.end);
    if (diffDays < 3) throw new BadRequestException('оишбка');
    return true;
  }
  private async findDifDays(start: Date, end: Date){
    const timeDiff = Math.abs(end.getTime() - start.getTime());
    const diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
    return diffDays;
  }
  private async calculate(
    start: Date,
    end: Date,
    tariff: TariffEnum,
    sale: SaleEnum,
  ): Promise<string> {
    const diffDays = await this.findDifDays(start, end);
    let pd = 0;//это per day
    if (tariff == TariffEnum.FIRST) pd = 270;
    if (tariff == TariffEnum.SECOND) pd = 330;
    if (tariff == TariffEnum.THIRD) pd = 390;
    let theSale = 0;
    if (tariff == TariffEnum.FIRST) theSale = 0.95;
    if (tariff == TariffEnum.SECOND) theSale = 0.9;
    if (tariff == TariffEnum.THIRD) theSale = 0.85;
    const result = diffDays * pd * theSale;
    return result.toString();
  }
}
