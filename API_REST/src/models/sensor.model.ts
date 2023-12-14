import {DataTypes} from 'sequelize';
import {sequelize} from '../database'

export const Sensor = sequelize.define('Sensor',{
  bmp: DataTypes.INTEGER,
})