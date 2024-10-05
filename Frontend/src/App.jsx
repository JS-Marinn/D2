import React, { useState, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
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

function App() {
  const location = useLocation();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      setLoading(false);
    }, 500); // Ajusta la duración según sea necesario

    return () => clearTimeout(timer);
  }, [location]);

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
        </Routes>
      </AnimatePresence>
    </>
  );
}

export default App;
