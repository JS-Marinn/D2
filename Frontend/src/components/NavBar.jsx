import React, { useContext } from 'react';
import Logo from "../assets/img/Logo.jpeg";
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const NavBar = () => {
  const { user, logout } = useContext(AuthContext);
  const userName = user ? user.nombre : '';
  const userRole = user ? user.role : '';

  return (
    <div className="navbar">
      <div className="navbar-section">
        <img className="Logo" src={Logo} alt="logo" />
      </div>

      <div className={`navbar-section links ${userRole === 'admin' ? 'admin-links' : 'user-links'}`}>
        {/* Si el usuario es admin, mostrar 7 enlaces; si no, mostrar solo 5 */}
        {userRole === 'admin' ? (
          <>
            <Link to="/pharmacy">Drogueria</Link>
            <Link to="/home">Hogar</Link>
            <Link to="/market">Mercado</Link>
            {/* Icono de inicio centrado */}
            <Link to="/" className="centered-home-icon"><i className="home icon"></i></Link>
            <Link to="/tek">Tecnologia</Link>
            <Link to="/proveedores">Proveedores</Link>
            <Link to="/log">Log</Link>
          </>
        ) : (
          <>
            <Link to="/pharmacy">Drogueria</Link>
            <Link to="/home">Hogar</Link>
            {/* Icono de inicio centrado */}
            <Link to="/" className="centered-home-icon"><i className="home icon"></i></Link>
            <Link to="/market">Mercado</Link>
            <Link to="/tek">Tecnologia</Link>
          </>
        )}
      </div>

      <div className="navbar-section">
        {user ? (
          <>
            <div className="welcome-message">
              <span>¡Hola, {userName}!</span>
            </div>
            <div className="ui vertical animated button" tabIndex="0" onClick={logout} style={{ cursor: 'pointer' }}>
              <div className="hidden content">Cerrar sesión</div>
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
