import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateEvaluationDto {
  @ApiProperty()
  @IsNotEmpty({ message: 'Puan boş bırakılamaz.' })
  rating: number;

  @ApiProperty()
  @IsNotEmpty({ message: 'Yorum boş bırakılamaz.' })
  comment: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'Ürün boş bırakılamaz.' })
  productId: number;
}
