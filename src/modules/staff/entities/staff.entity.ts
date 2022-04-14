import { NOW } from 'sequelize';
import {
  BelongsTo,
  Column,
  ForeignKey,
  Model,
  Table,
  Default,
  IsEmail,
  AllowNull,
  PrimaryKey,
  BeforeUpdate,
  BeforeCreate
} from 'sequelize-typescript';
import { UserEntity } from '@modules/user/entities/user.entity';
import { hashPassword } from '@services/bcrypt.service';
import _ from 'lodash';

@Table({ paranoid: true, tableName: 'staffs', underscored: true })
export class StaffEntity extends Model<StaffEntity, CreationAttributes> {
  @PrimaryKey
  @ForeignKey(() => UserEntity)
  @Column
  id: number;

  @Column
  name: string;

  @AllowNull(false)
  @IsEmail
  @Column
  email: string;

  @Column
  contactNo: string;

  @Column
  password: string;

  @AllowNull(false)
  @Default(false)
  @Column
  fullAccess: boolean;

  @AllowNull(false)
  @Default(true)
  @Column
  active: boolean;

  /* -------------------------------- Action by ------------------------------- */
  @ForeignKey(() => UserEntity)
  @Column
  createdBy: number;

  @ForeignKey(() => UserEntity)
  @Column
  updatedBy: number;

  @ForeignKey(() => UserEntity)
  @Column
  deletedBy: number;

  /* ------------------------------- Timestamps ------------------------------- */
  @Default(NOW)
  @Column
  createdAt: Date;

  @Column
  updatedAt: Date;

  @Column
  deletedAt: Date;

  /* -------------------------------- Relations ------------------------------- */
  @BelongsTo(() => UserEntity, 'createdBy')
  creator: UserEntity;

  /* ---------------------------------- Hooks --------------------------------- */
  @BeforeUpdate
  @BeforeCreate
  static async hashPassword(instance: StaffEntity) {
    const isPasswordChanges = _.includes(instance.changed() || [], 'password');
    instance.email = _.toLower(instance.email);
    if (isPasswordChanges) {
      const hashedPassword = hashPassword(instance.password);
      instance.password = hashedPassword;
    }
  }
}

interface CreationAttributes {
  id: number;
  name: string;
  email: string;
  password: string;
  createdBy: number;
}
