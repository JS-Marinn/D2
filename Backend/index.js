import express from "express";
import cors from 'cors';
import dotenv from 'dotenv';
import conectarDB from "./config/db.js";
import usuarioRoutes from './routes/usuarioRoutes.js';
import proveedorRoutes from './routes/proveedorRoutes.js';
import pedidoRoutes from './routes/pedidoRoutes.js';
import productRoutes from './routes/productRoutes.js';  // Importar las rutas de productos

// Importar la función para registrar administradores predefinidos
import { registrarAdminsPredefinidos } from './controllers/usuarioController.js';

const app = express();
app.use(cors());
app.use(express.json());
dotenv.config();
conectarDB();

// Registrar administradores predefinidos al iniciar el servidor
registrarAdminsPredefinidos();

// Definir las rutas
app.use("/api/usuarios", usuarioRoutes);
app.use("/api/proveedores", proveedorRoutes);
app.use("/api/pedidos", pedidoRoutes);
app.use("/api/products", productRoutes);  // Usar las rutas de productos

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});
