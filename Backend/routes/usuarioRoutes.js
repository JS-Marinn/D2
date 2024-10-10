import express from 'express';
const router = express.Router();
import { registrar, autenticar } from "../controllers/usuarioController.js";

// Registro de usuarios y autenticación
router.post('/', registrar); // Registrar nuevo usuario
router.post('/login', autenticar); // Iniciar sesión

export default router;
