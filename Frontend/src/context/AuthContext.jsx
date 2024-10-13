import React, { createContext, useState, useEffect } from 'react';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  // Estado para el usuario y el rol
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  // Función para iniciar sesión
  const login = (token, role, nombre) => {
    const userData = { token, role, nombre }; // Guarda el rol y el nombre del usuario
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
  };

  // Función para cerrar sesión
  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  // Efecto para cargar el usuario guardado en el localStorage al montar
  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider, AuthContext };
