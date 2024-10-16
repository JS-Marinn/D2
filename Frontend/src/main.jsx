import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx';
import { AuthProvider } from './context/AuthContext'; // Importa el contexto
import './Index.css';
import { CartProvider } from './CartContext.jsx'; // Importar CartProvider

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <CartProvider>
      <BrowserRouter>
        <AuthProvider> 
          <App />
        </AuthProvider>
      </BrowserRouter>
    </CartProvider>
  </React.StrictMode>,
);
