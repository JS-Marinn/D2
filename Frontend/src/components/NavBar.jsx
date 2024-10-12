import React from 'react';
import Logo from "../assets/img/Logo.jpeg";
import { Link } from 'react-router-dom';

const NavBar = () => {
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
        <Link to="/proveedores">Proveedores</Link> {/* Nuevo enlace */}
      </div>

      <div className="navbar-section">
        <div className="ui vertical animated button" tabIndex="0">
          <div className="hidden content">
            <Link to="/login">Acceder</Link>
          </div>
          <div className="visible content">
            <i className="user icon"></i>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
