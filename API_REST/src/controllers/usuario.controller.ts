import {Response,Request} from 'express'
import {Usuario} from '../models/usuario.model'

export class UsuarioController{
  async login({body}:Request, res:Response){
    try {
      const {email, password} = body;
      const data = await Usuario.findOne({
        where:{
          email,
          password
        }
      });
      if(!data){
        throw new Error('Credenciales incorrectas!');
      }
      res.json(data);
    } catch (error: any) {
      res.status(400).json({
        message:error.message ?? 'Error en el servidor'
      })
    }
  }
}