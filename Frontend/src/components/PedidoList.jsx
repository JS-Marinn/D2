import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';

const PedidoList = () => {
    const [pedidos, setPedidos] = useState([]);
    const { user } = useContext(AuthContext);

    useEffect(() => {
        const fetchPedidos = async () => {
            try {
                const response = await axios.get('/api/pedidos', {
                    headers: {
                        Authorization: `Bearer ${user.token}`
                    }
                });
                // Verifica que la respuesta sea un array
                if (Array.isArray(response.data)) {
                    setPedidos(response.data);
                } else {
                    console.error('La respuesta del servidor no es un array:', response.data);
                    setPedidos([]);
                }
            } catch (error) {
                console.error('Error al obtener los pedidos:', error);
                setPedidos([]);
            }
        };

        if (user && user.role === 'admin') {
            fetchPedidos();
        }
    }, [user]);

    const eliminarPedido = async (id) => {
        try {
            await axios.delete(`/api/pedidos/${id}`, {
                headers: {
                    Authorization: `Bearer ${user.token}`
                }
            });
            setPedidos(pedidos.filter((pedido) => pedido._id !== id));
            alert('Pedido eliminado con éxito');
        } catch (error) {
            console.error('Error al eliminar el pedido:', error);
        }
    };

    if (!user || user.role !== 'admin') {
        return <p>No tienes permiso para ver esta página.</p>;
    }

    return (
        <div>
            <h2>Gestión de Pedidos</h2>
            {pedidos.length === 0 ? (
                <p>No hay pedidos disponibles.</p>
            ) : (
                <ul>
                    {pedidos.map((pedido) => (
                        <li key={pedido._id}>
                            <p>Usuario: {pedido.nombreUsuario} - Total: ${pedido.total}</p>
                            <button onClick={() => eliminarPedido(pedido._id)}>Eliminar</button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default PedidoList;