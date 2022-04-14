import { Injectable } from '@nestjs/common';
import { CreateAdminDTO } from './dto/admin.dto';
import { Sequelize } from 'sequelize-typescript';
import { Transaction } from 'sequelize/types';
import { AdminEntity } from './entities/admin.entity';
import { UserEntity } from '@modules/user/entities/user.entity';
import { UserType } from '@constants';

@Injectable()
export class AdminService {
  constructor(private sequelize: Sequelize) {}
  async createOneAdmin(input: CreateAdminDTO, authData: AuthData, transaction?: Transaction): Promise<AdminEntity> {
    try {
      let admin: AdminEntity;
      const userData = { type: UserType.ADMIN };
      if (transaction) {
        const user = await UserEntity.create(userData, { transaction });
        admin = await AdminEntity.create({ ...input, id: user.id, createdBy: authData.id }, { transaction });
      } else {
        await this.sequelize.transaction(async (t: Transaction) => {
          const user = await UserEntity.create(userData, { transaction: t });
          admin = await AdminEntity.create({ ...input, id: user.id, createdBy: authData.id }, { transaction: t });
        });
      }
      return Promise.resolve(admin);
    } catch (e) {
      return Promise.reject(e);
    }
  }
}
