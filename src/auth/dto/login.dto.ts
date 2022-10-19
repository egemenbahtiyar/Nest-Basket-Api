import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class LoginDto {
  @ApiProperty()
  @IsNotEmpty({ message: 'Email boş bırakılamaz' })
  readonly email: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'Şifre boş bırakılamaz.' })
  readonly password: string;
}
