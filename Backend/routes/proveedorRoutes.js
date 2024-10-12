import express from 'express';
const router = express.Router();
import Proveedor from '../models/Proveedor.js'; // Asegúrate de que esta línea esté presente
import { registrarProveedor, obtenerProveedores, eliminarProveedor } from '../controllers/proveedorController.js';

// Rutas para proveedores
router.post('/', registrarProveedor); // Crear nuevo proveedor
router.get('/', obtenerProveedores); // Obtener todos los proveedores
router.put('/:id', async (req, res) => { // Actualizar proveedor
    try {
        const { id } = req.params;
        const proveedorActualizado = await Proveedor.findByIdAndUpdate(id, req.body, { new: true });
        if (!proveedorActualizado) {
            return res.status(404).json({ msg: "Proveedor no encontrado" });
        }
        res.json(proveedorActualizado);
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: "Error al actualizar el proveedor" });
    }
});
router.delete('/:id', eliminarProveedor); // Eliminar proveedor

export default router;
