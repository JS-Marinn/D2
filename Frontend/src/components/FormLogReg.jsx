import React, { useState, useRef, useContext } from 'react';
import axios from 'axios';
import Logo from "../assets/img/Logo.jpeg";
import google from "../assets/img/google.png";
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const CustomButton = React.forwardRef((props, ref) => (
  <button ref={ref} {...props} className="custom-button">{props.children}</button>
));

const CustomForm = React.forwardRef((props, ref) => (
  <form ref={ref} {...props} className="custom-form">{props.children}</form>
));

const LoginForm = React.forwardRef((props, ref) => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    try {
      const response = await axios.post('http://localhost:4000/api/usuarios/login', 
        { email, password }, 
        { headers: { 'Content-Type': 'application/json' } }
      );
      login(response.data.token, response.data.role, response.data.nombre);
      navigate('/home'); // Redirigir a home
    } catch (error) {
      console.error(error);
      if (error.response && error.response.data && error.response.data.msg) {
        alert(error.response.data.msg); // Mostrar mensaje de error al usuario
      } else {
        alert('Error en el inicio de sesión, por favor intenta nuevamente.');
      }
    }
  };

  return (
    <CustomForm ref={ref} onSubmit={handleSubmit}>
      <div className="login-segment">
        <div className="login-input">
          <input type="email" placeholder="E-mail" id='email' autoComplete="current-email" required />
        </div>
        <div className="login-input">
          <input type="password" placeholder="Contraseña" id='password' autoComplete="current-password" required />
        </div>
        <CustomButton>
          Iniciar Sesión
        </CustomButton>
      </div>
    </CustomForm>
  );
});

const RegisterForm = React.forwardRef((props, ref) => {
  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = e.target.emailRegister.value;
    const nombre = e.target.nombre.value;
    const password = e.target.password.value;

    try {
      const response = await axios.post('http://localhost:4000/api/usuarios', 
        { email, nombre, password }, 
        { headers: { 'Content-Type': 'application/json' } }
      );
      console.log(response.data);
      alert(response.data.msg); // Mostrar mensaje de éxito al usuario
    } catch (error) {
      console.error(error);
      if (error.response && error.response.data && error.response.data.msg) {
        alert(error.response.data.msg); // Mostrar mensaje de error al usuario
      } else {
        alert('Error al registrar, por favor intenta nuevamente.');
      }
    }
  };

  return (
    <CustomForm ref={ref} onSubmit={handleSubmit}>
      <div className="register-segment">
        <div className="register-input">
          <input type="email" placeholder="E-mail" id='emailRegister' required />
        </div>
        <div className="register-input">
          <input type="text" placeholder="Nombre Completo" id='nombre' autoComplete="Full-name" required />
        </div>
        <div className="register-input">
          <input type="password" placeholder="Contraseña" id='password' autoComplete="new-password" required />
        </div>
        <CustomButton>
          Registrarse
        </CustomButton>
      </div>
    </CustomForm>
  );
});

const FormLogReg = () => {
  const [showLoginForm, setShowLoginForm] = useState(true);
  const loginFormRef = useRef();
  const registerFormRef = useRef();

  const handleToggleForm = () => {
    setShowLoginForm(!showLoginForm);
  };

  return (
    <div className="form-container">
      <div className="form-column">
        {showLoginForm ? (
          <div className="login-form">
            <div className="login-header">
              <img src={Logo} alt="Logo" />
              <span className='span-login-header'>Inicia Sesión en tu cuenta</span>
            </div>
            <LoginForm ref={loginFormRef} />
            <div className="message">
              ¿Eres nuevo? <a href='#' onClick={handleToggleForm}>Empezemos</a>
            </div>
          </div>
        ) : (
          <div className="register-form">
            <div className="register-header">
              <img src={Logo} alt="Logo" />
              <span className='span-register-header'>Crea tu cuenta</span>
            </div>
            <RegisterForm ref={registerFormRef} />
            <div className="message">
              ¿Ya tienes cuenta? <a href='#' onClick={handleToggleForm}>Inicia Sesión</a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FormLogReg;
