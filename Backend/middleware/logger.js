// middleware/logger.js
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import Log from '../models/Log.js'; // Importa el modelo de logs

// Obtener la ruta del archivo actual
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const logPath = path.join(__dirname, '../logs/adminActions.log');

const logAdminAction = async (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    const logMessage = `El administrador ${req.user.nombre} realizó la acción: ${req.method} ${req.originalUrl} - ${new Date().toISOString()}\n`;

    // Guardar en archivo
    fs.appendFile(logPath, logMessage, (err) => {
      if (err) {
        console.error('Error al registrar la acción del administrador en archivo:', err);
      }
    });

    // Guardar en la base de datos
    try {
      await Log.create({
        adminName: req.user.nombre,
        action: req.method,
        endpoint: req.originalUrl,
      });
    } catch (err) {
      console.error('Error al registrar la acción del administrador en la base de datos:', err);
    }
  }
  next();
};

export default logAdminAction;
