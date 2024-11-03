// Login.js
import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Login.css';

const Login = () => {
  return (
    <form className="login-form">
      <p className="login-instruction">Please log in using your employee credentials</p>

      <div className="form-group">
        <label htmlFor="username">Username</label>
        <input type="text" id="username" name="username" required />
      </div>

      <div className="form-group">
        <label htmlFor="password">Password</label>
        <input type="password" id="password" name="password" required />
      </div>

      <button type="submit" className="btn-login">Log in</button>

      <div className="login-options">
        <Link to="/forgot-password" className="forgot-password-link">Esqueceu senha?</Link>
        <span className="separator">|</span>
        <Link to="/cadastro" className="signup-link">Cadastra Conta</Link>
      </div>
    </form>
  );
};

export default Login;