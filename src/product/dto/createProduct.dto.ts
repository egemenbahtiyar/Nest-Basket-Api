import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateProductDto {
  @ApiProperty()
  @IsNotEmpty({ message: 'İsim boş bırakılamaz.' })
  name: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'Fiyat boş bırakılamaz.' })
  price: number;

  @ApiProperty()
  @IsNotEmpty({ message: 'Miktar boş bırakılamaz.' })
  stockNumber: number;

  @ApiProperty()
  @IsNotEmpty({ message: 'Kategori Idsi bırakılamaz.' })
  categoryId: number;
}
