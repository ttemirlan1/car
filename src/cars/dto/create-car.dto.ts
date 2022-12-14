import { ApiProperty } from '@nestjs/swagger';

export class CreateCarDto {
  @ApiProperty()
  brand: string;
  @ApiProperty()
  model: string;
  @ApiProperty()
  plate: string;
  @ApiProperty()
  VIN: string;

}
