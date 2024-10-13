import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const ProtectedRoute = ({ children, requiredRole }) => {
  const { user } = useContext(AuthContext);

  if (!user || user.role !== requiredRole) {
    // Redirigir a la página de inicio si el usuario no está autenticado o no tiene el rol requerido
    return <Navigate to="/" replace />;
  }

  return children; // Si el usuario tiene el rol adecuado, renderiza el contenido protegido
};

export default ProtectedRoute;
