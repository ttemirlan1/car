import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCarDto } from './dto/create-car.dto';
import { UpdateCarDto } from './dto/update-car.dto';
import { Cars } from './entities/car.entity';

// @Injectable()
export class CarsService {
  constructor(
    @InjectRepository(Cars)
    private carsRepo: Repository<Cars>,
  ) {}
  async create(createCarDto: CreateCarDto) {
    const car = await this.carsRepo.findOne({
      where: [{ VIN: createCarDto.VIN }, { plate: createCarDto.plate }],
    });
    //сверху был поиск по вину ИЛИ по НОМЕРУ`
    // where: [{ VIN: createCarDto.VIN , plate: createCarDto.plate }], =>  &&
    // where: [{ VIN: createCarDto.VIN } , { plate: createCarDto.plate }], =>  ||
    if (car) throw new BadRequestException(`car with VIN or plate already exists`);
    return await this.carsRepo.save(createCarDto);
  }

  async findAll() {
    return await this.carsRepo.find();
  }

  async findOne(id: number) {
    const todo = await this.carsRepo.findOne({ where: { id } });
    if (!todo) throw new BadRequestException('car is not find');
    return todo;
  }

  async update(id: number, updateCarDto: UpdateCarDto) {
    const car = await this.carsRepo.findOne({ where: { id } });
    if (!car) throw new BadRequestException();
    if (car.plate === updateCarDto.plate || car.VIN === updateCarDto.VIN)
      throw new BadRequestException();
    const updated = Object.assign(car, updateCarDto);
    return await this.carsRepo.save(updated);
  }

  async remove(id: number) {
    await this.findOne(id);
    await this.carsRepo.delete(id);
    return `DELETED ${id}`;
  }
}
