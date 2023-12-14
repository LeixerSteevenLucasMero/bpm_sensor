import {DataTypes} from 'sequelize';
import {sequelize} from '../database';

export const Usuario = sequelize.define('Usuario',{
  nombre: DataTypes.STRING,
  email: DataTypes.STRING,
  password: DataTypes.STRING,
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: new Date()
  }
})