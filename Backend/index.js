import express from "express";
import cors from 'cors';
import dotenv from 'dotenv';
import conectarDB from "./config/db.js";
import usuarioRoutes from './routes/usuarioRoutes.js';
import proveedorRoutes from './routes/proveedorRoutes.js';
import pedidoRoutes from './routes/pedidoRoutes.js';

const app = express();
app.use(cors());
app.use(express.json());
dotenv.config();
conectarDB();

app.use("/api/usuarios", usuarioRoutes);
app.use("/api/proveedores", proveedorRoutes); 
app.use("/api/pedidos", pedidoRoutes);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});
