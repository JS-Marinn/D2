import React, { useState, useRef, useContext } from 'react';
import axios from 'axios';
import Logo from "../assets/img/Logo.jpeg";
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const CustomButton = React.forwardRef((props, ref) => (
  <button ref={ref} {...props} className="custom-button">{props.children}</button>
));

const CustomForm = React.forwardRef((props, ref) => (
  <form ref={ref} {...props} className="custom-form">{props.children}</form>
));

const validateEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

const validatePassword = (password) => password.length >= 6;

const LoginForm = React.forwardRef((props, ref) => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    let validationErrors = {};
    if (!validateEmail(email)) validationErrors.email = 'Correo electrónico no válido.';
    if (!validatePassword(password)) validationErrors.password = 'La contraseña debe tener al menos 6 caracteres.';
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      try {
        const response = await axios.post('http://localhost:4000/api/usuarios/login', 
          { email, password }, 
          { headers: { 'Content-Type': 'application/json' } }
        );
        login(response.data.token, response.data.role, response.data.nombre);
        navigate('/home'); // Redirigir a home
      } catch (error) {
        alert(error.response?.data?.msg || 'Error en el inicio de sesión.');
      }
    }
  };

  return (
    <CustomForm ref={ref} onSubmit={handleSubmit}>
      <div className="login-segment">
        <div className="login-input">
          <input 
            type="email" 
            placeholder="E-mail" 
            id='email' 
            autoComplete="current-email" 
            required 
          />
          {errors.email && <span className="error-message">{errors.email}</span>}
        </div>
        <div className="login-input">
          <input 
            type="password" 
            placeholder="Contraseña" 
            id='password' 
            autoComplete="current-password" 
            required 
            minLength="6"
          />
          {errors.password && <span className="error-message">{errors.password}</span>}
        </div>
        <CustomButton>
          Iniciar Sesión
        </CustomButton>
      </div>
    </CustomForm>
  );
});

const RegisterForm = React.forwardRef((props, ref) => {
  const [errors, setErrors] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = e.target.emailRegister.value;
    const nombre = e.target.nombre.value.trim();
    const password = e.target.password.value;

    let validationErrors = {};
    if (!validateEmail(email)) validationErrors.email = 'Correo electrónico no válido.';
    if (!nombre) validationErrors.nombre = 'El nombre no puede estar vacío.';
    if (!validatePassword(password)) validationErrors.password = 'La contraseña debe tener al menos 6 caracteres.';
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      try {
        const response = await axios.post('http://localhost:4000/api/usuarios', 
          { email, nombre, password }, 
          { headers: { 'Content-Type': 'application/json' } }
        );
        alert(response.data.msg);
      } catch (error) {
        alert(error.response?.data?.msg || 'Error al registrar.');
      }
    }
  };

  return (
    <CustomForm ref={ref} onSubmit={handleSubmit}>
      <div className="register-segment">
        <div className="register-input">
          <input 
            type="email" 
            placeholder="E-mail" 
            id='emailRegister' 
            required 
          />
          {errors.email && <span className="error-message">{errors.email}</span>}
        </div>
        <div className="register-input">
          <input 
            type="text" 
            placeholder="Nombre Completo" 
            id='nombre' 
            autoComplete="name" 
            required 
          />
          {errors.nombre && <span className="error-message">{errors.nombre}</span>}
        </div>
        <div className="register-input">
          <input 
            type="password" 
            placeholder="Contraseña" 
            id='password' 
            autoComplete="new-password" 
            required 
            minLength="6"
          />
          {errors.password && <span className="error-message">{errors.password}</span>}
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
              ¿Eres nuevo? <a href='#' onClick={handleToggleForm}>Empecemos</a>
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
