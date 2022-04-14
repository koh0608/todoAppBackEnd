'use strict';
const { Model, Sequelize } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class todo extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  todo.init(
    {
      title: {
        type: DataTypes.STRING,
        allowNull: false
      },
      link: {
        type: DataTypes.STRING,
        allowNull: false
      },
      tag: {
        type: DataTypes.STRING,
        allowNull: false
      },
      dueDate: {
        type: DataTypes.DATE,
        allowNull: false
      },createBy:{
        type: DataTypes.NUMBER,
        allowNull: false
      }
    },
    {
      sequelize,
      modelName: 'todo'
    }
  );
  return todo;
};
