import React, { useState, useEffect, useContext } from 'react';
import { Routes, Route, useLocation, Link } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import LoadingScreen from './LoadingScreen';
import './Index.css';
import Index from './Index';
import Pharmacy from './Pharmacy';
import Home from './Home';
import Market from './Market';
import Tek from './Tek';
import Legal from './Legal';
import About from './About';
import Login from './Login';
import Proveedores from './Proveedores';
import ProtectedRoute from './routes/ProtectedRoute';
import Cart from './Cart';
import { CartProvider, CartContext } from './CartContext'; // Importamos el contexto y el CartProvider


const pageVariants = {
  initial: {
    opacity: 0,
  },
  in: {
    opacity: 1,
  },
  out: {
    opacity: 0,
  },
};

const pageTransition = {
  duration: 0.5,
};

const AnimatedRoute = ({ element }) => (
  <motion.div
    initial="initial"
    animate="in"
    exit="out"
    variants={pageVariants}
    transition={pageTransition}
  >
    {element}
  </motion.div>
);

function FloatingCart() {
  const { cartItems } = useContext(CartContext); // Acceder a los items del carrito

  return (
    <div className="floating-cart">
      <Link to="/cart">
        🛒 Carrito ({cartItems.length}) {/* Mostramos el contador de productos */}
      </Link>
    </div>
  );
}

function App() {
  const location = useLocation();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      setLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, [location]);

  return (
    <CartProvider>
      {loading && <LoadingScreen />}
      <AnimatePresence mode="wait" onExitComplete={() => setLoading(false)}>
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<AnimatedRoute element={<Index />} />} />
          <Route path="/pharmacy" element={<AnimatedRoute element={<Pharmacy />} />} />
          <Route path="/home" element={<AnimatedRoute element={<Home />} />} />
          <Route path="/market" element={<AnimatedRoute element={<Market />} />} />
          <Route path="/tek" element={<AnimatedRoute element={<Tek />} />} />
          <Route path="/legal" element={<AnimatedRoute element={<Legal />} />} />
          <Route path="/about" element={<AnimatedRoute element={<About />} />} />
          <Route path="/login" element={<AnimatedRoute element={<Login />} />} />
          <Route path="/cart" element={<AnimatedRoute element={<Cart />} />} />
          <Route 
            path="/proveedores" 
            element={
              <ProtectedRoute requiredRole="admin">
                <AnimatedRoute element={<Proveedores />} />
              </ProtectedRoute>
            } 
          />
        </Routes>
      </AnimatePresence>
      <FloatingCart /> {/* Mostramos el carrito flotante en todas las vistas */}
    </CartProvider>
  );
}

export default App;
