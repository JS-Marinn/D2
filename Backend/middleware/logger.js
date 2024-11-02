import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Obtener la ruta del archivo actual
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const logPath = path.join(__dirname, '../logs/adminActions.log');

const logAdminAction = (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    const logMessage = `El administrador ${req.user.nombre} realizó la acción: ${req.method} ${req.originalUrl} - ${new Date().toISOString()}\n`;
    fs.appendFile(logPath, logMessage, (err) => {
      if (err) {
        console.error('Error al registrar la acción del administrador:', err);
      }
    });
  }
  next();
};

export default logAdminAction;