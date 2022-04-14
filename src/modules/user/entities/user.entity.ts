import { AutoIncrement, Column, Model, PrimaryKey, Table, AllowNull, HasOne, IsIn } from 'sequelize-typescript';
import { AdminEntity } from '@modules/admin/entities/admin.entity';
import { UserType } from '@constants';
import { StaffEntity } from '@modules/staff/entities/staff.entity';

@Table({ tableName: 'users', underscored: true })
export class UserEntity extends Model<UserEntity, UserCreationAttributes> {
  @PrimaryKey
  @AutoIncrement
  @Column
  id: number;

  @AllowNull(false)
  @IsIn([Object.values(UserType)])
  @Column
  type: string;

  @Column
  lastReadNotificationAt: Date;

  @Column
  active: boolean;

  /* ------------------------------- Timestamps ------------------------------- */
  @Column
  createdAt: Date;

  @Column
  updatedAt: Date;

  @Column
  deletedAt: Date;

  /* -------------------------------- Relations ------------------------------- */
  @HasOne(() => AdminEntity)
  admin: AdminEntity;

  @HasOne(() => StaffEntity)
  staff: StaffEntity;
}

interface UserCreationAttributes {
  type: UserType;
}
