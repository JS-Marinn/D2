// CartContext.jsx
import React, { createContext, useState } from 'react';

// Crear el contexto
export const CartContext = createContext();

// Proveedor del contexto
export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  // Función para agregar un producto al carrito
  const addToCart = (product) => {
    const existingProduct = cartItems.find((item) => item.id === product.id);
    if (existingProduct) {
      setCartItems(
        cartItems.map((item) =>
          item.id === product.id ? { ...item, cantidad: item.cantidad + 1 } : item
        )
      );
    } else {
      setCartItems([...cartItems, { ...product, cantidad: 1 }]);
    }
  };

  // Función para eliminar un producto del carrito
  const removeFromCart = (productId) => {
    setCartItems(cartItems.filter((item) => item.id !== productId));
  };

  // Función para actualizar la cantidad de un producto en el carrito
  const updateCartQuantity = (productId, cantidad) => {
    setCartItems(
      cartItems.map((item) =>
        item.id === productId ? { ...item, cantidad: Number(cantidad) } : item
      )
    );
  };

  // Función para vaciar el carrito
  const clearCart = () => {
    setCartItems([]);
  };

  // Función para calcular el total del carrito
  const calculateTotal = () => {
    return cartItems.reduce((sum, item) => {
      const itemPrice = parseFloat(item.precio);
      const itemQuantity = parseInt(item.cantidad, 10);
      // Asegurarse de que tanto el precio como la cantidad sean números válidos
      if (!isNaN(itemPrice) && !isNaN(itemQuantity)) {
        return sum + itemPrice * itemQuantity;
      }
      return sum;
    }, 0);
  };

  return (
    <CartContext.Provider
      value={{ cartItems, addToCart, removeFromCart, updateCartQuantity, clearCart, calculateTotal }}
    >
      {children}
    </CartContext.Provider>
  );
};
