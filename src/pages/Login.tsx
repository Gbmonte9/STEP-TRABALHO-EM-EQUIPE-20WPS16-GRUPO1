import Usuario from '../classes/Usuario.ts'; 
import { Link, useNavigate } from 'react-router-dom';
import { useState, FormEvent } from 'react';
import '../styles/Login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent) => {

    e.preventDefault();

    const usuario = new Usuario();

    const isLoggedIn = await usuario.usuarioLogin(email, senha);

    if (isLoggedIn) {
      const usuarioId = usuario.getId();
      const usuarioNome = usuario.getNome();

      console.log('Login bem-sucedido, id:', usuarioId, 'nome:', usuarioNome);

      localStorage.setItem('usuarioId', usuarioId.toString());
      localStorage.setItem('usuarioNome', usuarioNome);

      navigate('/dashboard');
    } else {
      setErrorMessage('Email e Senha invalida.');
    }
  };

  return (
    <form className="login-form" onSubmit={handleSubmit}>
      <p className="login-instruction">Por favor, faça login com suas credenciais</p>

      <div className="form-group">
        <label htmlFor="email">Email</label>
        <input 
          type="email"  
          id="email" 
          name="email" 
          value={email}
          onChange={(e) => setEmail(e.target.value)} 
          required 
        />
      </div>

      <div className="form-group">
        <label htmlFor="password">Senha</label>
        <input 
          type="password" 
          id="password" 
          name="password" 
          value={senha}  
          onChange={(e) => setSenha(e.target.value)} 
          required 
        />
      </div>

      {errorMessage && <p className="error-message">{errorMessage}</p>}

      <button type="submit" className="btn-login">Entrar</button>

      <div className="login-options">
        <Link to="/forgot-password" className="forgot-password-link">Esqueceu a senha?</Link>
        <span className="separator">|</span>
        <Link to="/cadastro" className="signup-link">Cadastrar Conta</Link>
      </div>
    </form>
  );
};

export default Login;