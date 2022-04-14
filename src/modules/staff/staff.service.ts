import { Injectable, NotAcceptableException } from '@nestjs/common';
import { CreateStaffDTO, StaffChangePasswordDTO, UpdateStaffDTO } from './dto/staff.dto';
import { Sequelize } from 'sequelize-typescript';
import { Transaction } from 'sequelize/types';
import { StaffEntity } from './entities/staff.entity';
import { UserEntity } from '@modules/user/entities/user.entity';
import { UserType } from '@constants';
import { comparePassword } from '@services/bcrypt.service';

@Injectable()
export class StaffService {
  constructor(private sequelize: Sequelize) {}
  async createOneStaff(input: CreateStaffDTO, authData: AuthData, transaction?: Transaction): Promise<StaffEntity> {
    try {
      let staff: StaffEntity;
      const userData = { type: UserType.STAFF };
      if (transaction) {
        const user = await UserEntity.create(userData, { transaction });
        staff = await StaffEntity.create({ ...input, id: user.id, createdBy: authData.id }, { transaction });
      } else {
        await this.sequelize.transaction(async (t: Transaction) => {
          const user = await UserEntity.create(userData, { transaction: t });
          staff = await StaffEntity.create({ ...input, id: user.id, createdBy: authData.id }, { transaction: t });
        });
      }
      return Promise.resolve(staff);
    } catch (e) {
      return Promise.reject(e);
    }
  }

  async staffUpdateMeInfo(input: UpdateStaffDTO, authData: AuthData) {
    const staff = await StaffEntity.findByPk(authData.id);
    if (!staff) throw new Error(`Staff with id "${authData.id}" was not found`);
    await staff.update(input);
    return staff;
  }

  async staffChangePassword(input: StaffChangePasswordDTO, authData: AuthData): Promise<StaffEntity> {
    try {
      if (input.newPassword !== input.confirmPassword) {
        throw new Error('Confirmation password does not match with new password');
      }

      const staff = await StaffEntity.findByPk(authData.id);
      if (!staff) throw new Error(`Staff with id "${authData.id}" was not found`);

      const isPasswordValid = await comparePassword(input.oldPassword, staff.password);
      if (!isPasswordValid) throw new NotAcceptableException('Incorrect old password given.');

      await staff.update({ password: input.newPassword });
      return Promise.resolve(staff);
    } catch (e) {
      return Promise.reject(e);
    }
  }
}
