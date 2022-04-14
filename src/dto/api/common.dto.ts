import { ApiProperty } from '@nestjs/swagger';

export class StandardResponse {
  @ApiProperty({ example: 'Success' })
  message: string;
  @ApiProperty({ example: 200 })
  statusCode: number;
}

export class AuthData {
  @ApiProperty() id: number;
  @ApiProperty() type: string;
}
