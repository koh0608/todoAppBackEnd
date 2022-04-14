import _ from 'lodash';
import { NOW } from 'sequelize';
import {
  BelongsTo,
  Model,
  Table,
  Default,
  AllowNull,
  PrimaryKey,
  AutoIncrement,
  Column,
  DataType
} from 'sequelize-typescript';
import { UserTodoEntity } from '@modules/usertodo/entities/usertodo.entity';
import { IsEnum } from 'class-validator';
import { composeK } from 'ramda';

@Table({ paranoid: true, tableName: 'todos' })
export class TodoEntity extends Model<TodoEntity, CreationAttributes> {
  @PrimaryKey
  @AutoIncrement
  @Column
  id: number;

  @AllowNull(false)
  @Column
  title: string;

  @Column
  link: string;

  // OPEN INPROGRESS HOLD OVERDUE DELETED
  @AllowNull(false)
  @Default('OPEN')
  @Column
  tag: string;

  /* ------------------------------- Timestamps ------------------------------- */
  @Default(NOW)
  @Column
  createdAt: Date;

  @AllowNull(false)
  @Column
  dueDate: Date;

  /* -------------------------------- Relations ------------------------------- */
  @Column
  creator: number;
}

interface CreationAttributes {
  id: number;
  title: string;
  link: string;
  tag: string;
  createdAT: Date;
  dueDate: Date;
  creator:number;
}
