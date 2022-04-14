import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { comparePassword } from '@services/bcrypt.service';
import { UsertodoDto } from './dto/usertodo.dto';
import { UserTodoEntity } from './entities/usertodo.entity';

@Injectable()
export class UsertodoService {
  constructor(
    @InjectModel(UserTodoEntity)
    private userTodoModel: typeof UserTodoEntity
  ) {}
  async signup(usertodoDto: UsertodoDto) {
    const user = await this.userTodoModel.create(usertodoDto);
    return user;
  }

  async signin(usertodoDto: UsertodoDto) {
    const user = await this.userTodoModel.findOne({
      where: {
        email: usertodoDto.email,
      }
    });
    if (!user) {
      throw new NotFoundException('invalid user');
    }
    const valid = await comparePassword(usertodoDto.password, user.password);
    if (!valid) throw new Error('Email or password is incorrect');
    return user;
  }
}
