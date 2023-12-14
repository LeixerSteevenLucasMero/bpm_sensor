import express, { Request, Response } from "express";
import morgan from "morgan";
import cors from "cors";
import { Sensor } from './models/sensor.model';



import { PORT } from './config';
import { conectar } from './database';
import { ClienteMQTT } from './mqtt';

import SensorRoute from './routes/sensor.route';
import UsuarioRoute from './routes/usuario.route';
import { Usuario } from "./models/usuario.model";

export class Server {
  private app;
  private clientMQTT: ClienteMQTT;

  constructor() {
    this.app = express();
    this.configuration();
    this.middlewares();
    this.routes();
    this.clientMQTT = new ClienteMQTT();
  }

  private routes() {
    this.app.get('/', (req: Request, res: Response) => {
      res.json({
        name: 'REST API - IOT'
      });
    });

    // Ruta para insertar datos en el sensor
    this.app.post('/api/sensor/insertData', async (req: Request, res: Response) => {
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
    });

    this.app.use('/api/sensor', SensorRoute);
    this.app.use('/api/login', UsuarioRoute);
  }

  private middlewares() {
    this.app.use(cors());
    this.app.use(morgan('dev'));
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: false }));
  }

  private configuration() {
    this.app.set('port', PORT || 5000);
  }

  async listen() {
    this.app.listen(this.app.get('port'), () => {
      console.log(`Server corriendo en el puerto ${this.app.get('port')}`);
    });
    await conectar();
    await this.crearAdministrador();
    this.clientMQTT.conectar();
  }

  private async crearAdministrador() {
    try {
      const data = await Usuario.findOne({
        where: {
          email: 'administrador@gmail.com',
          password: '12345678'
        }
      });
      if (!data) {
        await Usuario.create({
          nombre: 'Admin',
          email: 'administrador@gmail.com',
          password: '12345678'
        });
        console.log('Usuario administrador creado!');
      }
    } catch (error) {
      console.log(error);
    }
  }
}
