import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';
import { StandardResponse, AuthData } from '@dto/api/common.dto';

export { StandardResponse, AuthData };

export interface AuthResponseData {
  data: AuthData;
  accessToken: string;
  refreshToken: string;
}

export class LoginDTO {
  @ApiProperty({ example: 'admin01@test.com' })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({ example: '1234' })
  @IsNotEmpty()
  password: string;
}

export class RevokeDTO {
  @ApiProperty()
  @IsNotEmpty()
  token: string;
}

export class LoginResponseDTO extends StandardResponse {
  @ApiProperty()
  payload: AuthData;
}
