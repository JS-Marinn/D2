import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import Logo from "../assets/img/Logo.jpeg";
import { AuthContext } from '../context/AuthContext'; // Asegúrate de que esto es correcto

const NavBar = () => {
  const { user, logout } = useContext(AuthContext); // Acceder al nombre del usuario y a la función de logout desde el contexto

  return (
    <div className="navbar">
      <div className="navbar-section">
        <img className="Logo" src={Logo} alt="logo" />
      </div>

      <div className="navbar-section links">
        <Link to="/pharmacy">Droguería</Link>
        <Link to="/home">Hogar</Link>
        <Link to="/"><i className="home icon"></i></Link>
        <Link to="/market">Mercado</Link>
        <Link to="/tek">Tecnología</Link>
        <Link to="/proveedores">Proveedores</Link>
      </div>

      <div className="navbar-section">
        {user ? (
          <div className="welcome-message">
            <span>¡Hola, {user.nombre}!</span> {/* Saludo con el nombre del usuario */}
            <button onClick={logout} className="logout-button">Cerrar sesión</button>
          </div>
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
