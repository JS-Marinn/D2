// pedidoController.js
import Pedido from '../models/Pedido.js';

// Registrar un pedido
const registrarPedido = async (req, res) => {
    try {
        const { usuario, nombreUsuario, correoUsuario, proveedor, productos, total } = req.body;

        const pedido = new Pedido({
            usuario,
            nombreUsuario,
            correoUsuario,
            proveedor,
            productos,
            total
        });

        const pedidoAlmacenado = await pedido.save();
        res.json(pedidoAlmacenado);
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'Error al registrar el pedido' });
    }
};

// Obtener pedidos
const obtenerPedidos = async (req, res) => {
    try {
        const pedidos = await Pedido.find().populate('usuario').populate('proveedor');
        res.json(pedidos);
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'Error al obtener los pedidos' });
    }
};

// Eliminar un pedido
const eliminarPedido = async (req, res) => {
    try {
        const { id } = req.params;
        const pedido = await Pedido.findById(id);

        if (!pedido) {
            return res.status(404).json({ msg: 'Pedido no encontrado' });
        }

        await pedido.remove();
        res.json({ msg: 'Pedido eliminado' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'Error al eliminar el pedido' });
    }
};

export { registrarPedido, obtenerPedidos, eliminarPedido };