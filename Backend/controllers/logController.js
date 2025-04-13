// controllers/logController.js
import Log from '../models/Log.js';

export const obtenerLogs = async (req, res) => {
  try {
    const logs = await Log.find().sort({ createdAt: -1 }); // Obtener logs en orden descendente
    res.json(logs);
  } catch (error) {
    res.status(500).json({ msg: "Error al obtener los logs" });
  }
};
// Esto es una prueba