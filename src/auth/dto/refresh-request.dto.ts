import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RefreshRequest {
  @ApiProperty()
  @IsNotEmpty({ message: 'The refresh token is required' })
  readonly refresh_token: string;
}
