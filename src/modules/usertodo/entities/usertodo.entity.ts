import _ from 'lodash';
import { NOW } from 'sequelize';
import {
  BelongsTo,
  BeforeCreate,
  BeforeUpdate,
  Column,
  Model,
  Table,
  Default,
  IsEmail,
  AllowNull,
  PrimaryKey,
  AutoIncrement,
  Unique
} from 'sequelize-typescript';
import { hashPassword } from '@services/bcrypt.service';

@Table({ paranoid: true, tableName: 'usertodos' })
export class UserTodoEntity extends Model<UserTodoEntity, CreationAttributes> {
  @AutoIncrement
  @PrimaryKey
  @Column
  id: number;

  @AllowNull(false)
  @IsEmail
  @Unique
  @Column
  email: string;

  @AllowNull(false)
  @Column
  password: string;

  /* ------------------------------- Timestamps ------------------------------- */
  @Default(NOW)
  @Column
  createdAt: Date;

  @Default(NOW)
  @Column
  updatedAt: Date;

  @Column
  deletedAt: Date;

  /* ---------------------------------- Hooks --------------------------------- */
  @BeforeUpdate
  @BeforeCreate
  static async hashPassword(instance: UserTodoEntity) {
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
  email: string;
  password: string;
  createdAt: Date;
  deletedAt: Date;
}
