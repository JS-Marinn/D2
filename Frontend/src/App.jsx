import React, { useContext, useState, useEffect } from 'react';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import LoadingScreen from './LoadingScreen';
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
import PedidoList from '../src/components/PedidoList'; 
import Cart from './Cart';
import { CartContext } from './CartContext';
import { AuthContext } from './context/AuthContext';
import './Index.css';

const pageVariants = {
  initial: { opacity: 0 },
  in: { opacity: 1 },
  out: { opacity: 0 },
};

const pageTransition = { duration: 0.5 };

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

function App() {
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const { cartItems } = useContext(CartContext);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      setLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, [location]);

  const handleCartClick = () => {
    if (!user) {
      navigate('/login');
    } else {
      navigate('/cart');
    }
  };

  return (
    <>
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
          <Route
            path="/admin/pedidos"
            element={
              user && user.role === 'admin' ? (
                <AnimatedRoute element={<PedidoList />} />
              ) : (
                <AnimatedRoute element={<Login />} />
              )
            }
          />
        </Routes>
      </AnimatePresence>

      <div className="floating-cart" onClick={handleCartClick}>
        🛒 <span>Carrito ({cartItems.length})</span>
      </div>
    </>
  );
}

export default App;