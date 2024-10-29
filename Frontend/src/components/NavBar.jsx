import React, { useContext } from 'react';
import Logo from "../assets/img/Logo.jpeg";
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const NavBar = () => {
  const { user, logout } = useContext(AuthContext); // Acceder al usuario y la función logout desde el contexto
  const userName = user ? user.nombre : ''; // Nombre del usuario
  const userRole = user ? user.role : ''; // Rol del usuario

  return (
    <div className="navbar">
      <div className="navbar-section">
        <img className="Logo" src={Logo} alt="logo" />
      </div>

      <div className="navbar-section links">
        <Link to="/pharmacy">Drogueria</Link>
        <Link to="/home">Hogar</Link>
        <Link to="/"><i className="home icon"></i></Link>
        <Link to="/market">Mercado</Link>
        <Link to="/tek">Tecnologia</Link>
        {/* Mostrar la opción de Proveedores solo si el rol es admin */}
        {userRole === 'admin' && <Link to="/proveedores">Proveedores</Link>}
      </div>

      <div className="navbar-section">
        {user ? (
          <>
            <div className="welcome-message">
              <span>¡Hola, {userName}!</span>
            </div>
            <div className="ui vertical animated button" tabIndex="0" onClick={logout} style={{ cursor: 'pointer' }}>
              <div className="hidden content">
                Cerrar sesión
              </div>
              <div className="visible content">
                <i className="log out icon"></i>
              </div>
            </div>
          </>
        ) : (
          <div className="ui vertical animated button" tabIndex="0">
            <div className="hidden content">
              <Link to="/login">Acceder</Link>
            </div>
            <div className="visible content">
              <i className="user icon"></i>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default NavBar;