import React, { useContext } from 'react';
import axios from 'axios';
import { CartContext } from './CartContext';
import { AuthContext } from './AuthContext';

const Checkout = () => {
    const { cartItems, clearCart, calculateTotal } = useContext(CartContext);
    const { user } = useContext(AuthContext);

    const realizarPedido = async () => {
        try {
            if (!user) {
                alert('Debes iniciar sesión para realizar un pedido');
                return;
            }

            if (cartItems.length === 0) {
                alert('El carrito está vacío');
                return;
            }

            const total = calculateTotal();

            const pedidoData = {
                usuario: user._id,
                nombreUsuario: user.nombre,
                correoUsuario: user.email,
                proveedor: "proveedor_id_aqui", // Reemplaza con el ID del proveedor adecuado
                productos: cartItems.map((item) => ({
                    nombre: item.nombre,
                    cantidad: item.cantidad,
                    precio: item.precio,
                    productId: item.id
                })),
                total
            };

            const response = await axios.post('/api/pedidos', pedidoData, {
                headers: {
                    Authorization: `Bearer ${user.token}`
                }
            });

            console.log('Pedido realizado:', response.data);
            clearCart();
        } catch (error) {
            console.error('Error al realizar el pedido:', error);
        }
    };

    return (
        <div>
            <h2>Checkout</h2>
            <div>
                <h3>Resumen del Pedido:</h3>
                <ul>
                    {cartItems.map((item, index) => (
                        <li key={index}>
                            {item.nombre} - {item.cantidad} x ${item.precio}
                        </li>
                    ))}
                </ul>
                <p>Total: ${calculateTotal()}</p>
            </div>
            <button onClick={realizarPedido}>Realizar Pedido</button>
        </div>
    );
};

export default Checkout;