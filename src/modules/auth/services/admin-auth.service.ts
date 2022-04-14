import { UserType } from '@constants';
import { StaffEntity } from '@modules/staff/entities/staff.entity';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/sequelize';
import { JwtConfig } from '@configs/auth.config';
import { comparePassword } from 'src/services/bcrypt.service';
import { AdminEntity } from '@modules/admin/entities/admin.entity';
import { AuthResponseData } from '../dto/auth.dto';

@Injectable()
export class AdminAuthService {
  constructor(@InjectModel(AdminEntity) private Admin: typeof AdminEntity, private jwtService: JwtService) {}

  async login(email: string, password: string): Promise<AuthResponseData> {
    try {
      let type: UserType;
      let user = await this.Admin.findOne({ where: { email } });
      if (user) type = UserType.ADMIN;

      if (!user) {
        user = await StaffEntity.findOne({ where: { email } });
        if (!type && user) type = UserType.STAFF;
      }

      if (!user) throw new Error('Account not found');

      const valid = await comparePassword(password, user.password);
      if (!valid) throw new Error('Email or password is incorrect');

      const data: AuthData = { id: user.id, type };
      const accessToken = this.jwtService.sign(data, JwtConfig.access);
      const refreshToken = this.jwtService.sign(data, JwtConfig.refresh);

      return Promise.resolve({ data, accessToken, refreshToken });
    } catch (e) {
      return Promise.reject(e);
    }
  }

  async revoke(id: number): Promise<AuthResponseData> {
    try {
      const user = await this.Admin.findOne({ where: { id } });
      if (!user) throw new Error('Account not found');
      const data: AuthData = {
        id: user.id,
        type: UserType.ADMIN
      };
      const accessToken = this.jwtService.sign(data, JwtConfig.access);
      const refreshToken = this.jwtService.sign(data, JwtConfig.refresh);
      return Promise.resolve({ data, accessToken, refreshToken });
    } catch (e) {
      return Promise.reject(e);
    }
  }
}
