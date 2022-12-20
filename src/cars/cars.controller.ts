import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AdminGuard } from 'src/auth/guard/admin.guard';
import { CarsService } from './cars.service';
import { CreateCarDto } from './dto/create-car.dto';
import { UpdateCarDto } from './dto/update-car.dto';

// import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'; 
@ApiTags('Cars')
@Controller('cars')
export class CarsController {
  constructor(private readonly carsService: CarsService) {}
  @UseGuards(AdminGuard)
  @ApiBearerAuth()
  @Post()
  async create(@Body() createCarDto: CreateCarDto) {
    return await this.carsService.create(createCarDto);
  }

  @Get()
  async findAll() {
    return await this.carsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    return await this.carsService.findOne(id);
  }

  @Patch(':id')
  async update(@Param('id') id: number, @Body() updateCarDto: UpdateCarDto) {
    return await this.carsService.update(id, updateCarDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: number) {
    return await this.carsService.remove(id);
  }
}
