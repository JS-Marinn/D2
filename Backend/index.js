import express from "express";
import cors from 'cors';
import dotenv from 'dotenv';
import conectarDB from "./config/db.js";
import usuarioRoutes from './routes/usuarioRoutes.js';
import proveedorRoutes from './routes/proveedorRoutes.js';
import productRoutes from './routes/productRoutes.js';  // Importar las rutas de productos
import logRoutes from './routes/logRoutes.js';


// Importar la función para registrar administradores predefinidos
import { registrarAdminsPredefinidos } from './controllers/usuarioController.js';

// Cargar las variables de entorno
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
conectarDB();

// Registrar administradores predefinidos al iniciar el servidor
registrarAdminsPredefinidos();

// Definir las rutas
app.use("/api/usuarios", usuarioRoutes);
app.use("/api/proveedores", proveedorRoutes);
app.use("/api/products", productRoutes);  // Usar las rutas de productos
app.use("/api/logs", logRoutes); // Usar las rutas de logs


const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});
