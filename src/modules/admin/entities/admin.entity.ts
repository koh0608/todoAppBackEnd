import _ from 'lodash';
import { NOW } from 'sequelize';
import {
  BelongsTo,
  BeforeCreate,
  BeforeUpdate,
  Column,
  ForeignKey,
  Model,
  Table,
  Default,
  IsEmail,
  AllowNull,
  PrimaryKey
} from 'sequelize-typescript';
import { hashPassword } from '@services/bcrypt.service';
import { UserEntity } from '@modules/user/entities/user.entity';

@Table({ paranoid: true, tableName: 'admins', underscored: true })
export class AdminEntity extends Model<AdminEntity, CreationAttributes> {
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
  static async hashPassword(instance: AdminEntity) {
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
