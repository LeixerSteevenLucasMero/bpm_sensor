import {Response,Request} from 'express'
import {Sensor} from '../models/sensor.model'
import moment from 'moment'

export class SensorController{
  async getAll(req:Request, res:Response){
    try {
      const data = (await Sensor.findAll())
        .reverse()
        .map(x =>{
          x.dataValues.createdAt = moment(x.dataValues.createdAt).utc().subtract(5,'hour').format('DD-MM-yyyy HH:mm:ss')
          return x.dataValues
        });
      res.json(data)
    } catch (error: any) {
      res.status(400).json({
        message:error.message ?? 'Error en el servidor'
      })
    }
  }
  async insertSensorData(req: Request, res: Response) {
    try {
      // Obtener los datos del cuerpo de la solicitud
      const { bmp } = req.body;

      // Validar si se proporcionó el dato necesario (puedes agregar más validaciones según tus necesidades)
      if (!bmp) {
        return res.status(400).json({ message: 'El campo bmp es requerido' });
      }

      // Insertar el nuevo dato en la base de datos
      const newSensorData = await Sensor.create({ bmp });

      // Enviar la respuesta con el nuevo dato insertado
      res.status(201).json(newSensorData);
    } catch (error: any) {
      res.status(400).json({
        message: error.message ?? 'Error en el servidor',
      });
    }
  }
}