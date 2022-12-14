import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TariffService } from './tariff.service';
import { CreateTariffDto } from './dto/create-tariff.dto';

@Controller('tariff')
export class TariffController {
  constructor(private readonly tariffService: TariffService) {}

  @Post()
  async create(@Body() createTariffDto: CreateTariffDto) {
    return await this.tariffService.create(createTariffDto);
  }

  @Get()
  async findAll() {
    return await this.tariffService.findAll();
  }

  @Get('active')
  async findActive() {
    return await this.tariffService.findActive();
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.tariffService.remove(+id);
  }
}
