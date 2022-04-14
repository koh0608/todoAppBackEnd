import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UsertodoDto } from './dto/usertodo.dto';
import { UsertodoService } from './usertodo.service';

@Controller('usertodo')
export class UsertodoController {
  constructor(private usertodoService: UsertodoService) {}

  @ApiTags('Usertodo')
  @Post('signup')
  signup(@Body() usertodoDto:UsertodoDto) {
    return this.usertodoService.signup(usertodoDto);
  }

  @ApiTags('Usertodo')
  @Post('signin')
  signin(@Body() usertodoDto: UsertodoDto){
    return this.usertodoService.signin(usertodoDto)
  }
}
