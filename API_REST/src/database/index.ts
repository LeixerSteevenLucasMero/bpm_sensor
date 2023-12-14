import {Sequelize} from 'sequelize'

export const sequelize = new Sequelize('db_iot','Admin','Admin12345',{
  host:'localhost',
  dialect:'mysql'
})

export const conectar = async()=>{
  try {
    await sequelize.authenticate();
    await sequelize.sync({force:false,alter:true,logging:false})
    console.log('Base de datos conectada!');    
  } catch (error) {
    console.log(error);
  }
}