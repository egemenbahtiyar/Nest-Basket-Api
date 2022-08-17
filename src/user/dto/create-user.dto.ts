import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty()
  @IsNotEmpty({ message: 'İsim boş bırakılamaz.' })
  readonly fullname: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'Email boş bırakılamaz.' })
  @IsEmail({}, { message: 'Lütfen geçerli bir Email giriniz.' })
  readonly email: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'Şifre boş bırakılamaz.' })
  @MinLength(6, { message: 'Şifre en az 6 haneden oluşmalıdır.' })
  password: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'Doğum tarihi boş bırakılamaz.' })
  readonly birthday: Date;

  @ApiProperty()
  readonly isActive: boolean;
}
