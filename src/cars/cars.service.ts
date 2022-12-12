import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCarDto } from './dto/create-car.dto';
import { UpdateCarDto } from './dto/update-car.dto';
import { Cars } from './entities/car.entity';

@Injectable()
export class CarsService {
  constructor(
    @InjectRepository(Cars)
    private carsRepo: Repository<Cars>,
  ) {}
  async create(createCarDto: CreateCarDto) {
    return await this.carsRepo.save(createCarDto);
  }

  async findAll() {
    return await this.carsRepo.find();
  }

  async findOne(id: number) {
    const todo = await this.carsRepo.findOne({ where: { id } });
    if (!todo) throw new BadRequestException();
    return todo;
  }

  async update(id: number, updateCarDto: UpdateCarDto) {
    const car = await this.carsRepo.findOne({ where: { id } });
    if (!car) throw new BadRequestException();
    const updated = Object.assign(car, updateCarDto);
    return await this.carsRepo.save(updated);
  }

  async remove(id: number) {
    await this.findOne(id);
    await this.carsRepo.delete(id);
    return `DELETED ${id}`;
  }
}
