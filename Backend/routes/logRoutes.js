// routes/logRoutes.js
import express from 'express';
import { obtenerLogs } from '../controllers/logController.js';

const router = express.Router();
router.get('/', obtenerLogs); // Ruta para obtener los logs

export default router;
