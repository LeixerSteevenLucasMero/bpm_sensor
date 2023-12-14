import {Router} from 'express';
import {SensorController} from '../controllers/sensor.controller'

const router = Router();
const controller = new SensorController()

router.get('/', controller.getAll);

export default router;