import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Cadastro.css';

const Cadastro = () => {
  return (
    <form className="cadastro-form">
      <p className="cadastro-instruction">Por favor, preencha os dados para criar sua conta</p>

      <div className="form-group">
        <label htmlFor="username">Nome de Usuário</label>
        <input type="text" id="username" name="username" required />
      </div>

      <div className="form-group">
        <label htmlFor="email">E-mail</label>
        <input type="email" id="email" name="email" required />
      </div>

      <div className="form-group">
        <label htmlFor="password">Senha</label>
        <input type="password" id="password" name="password" required />
      </div>

      <div className="form-group">
        <label htmlFor="confirm-password">Confirma Senha</label>
        <input type="password" id="confirm-password" name="confirm-password" required />
      </div>

      <button type="submit" className="btn-cadastro">Cadastrar</button>

      <div className="cadastro-options">
        <Link to="/login" className="login-link">Já tem uma conta? Faça login</Link>
      </div>
    </form>
  );
};

export default Cadastro;