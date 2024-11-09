import { Link, useNavigate } from 'react-router-dom';
import { useState, FormEvent } from 'react';
import '../styles/Login.css';

const Login = () => {
  const [useremail, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (event: FormEvent) => {
    event.preventDefault();
    
    try {

      const response = await fetch('http://localhost:5000/usuarios');
      const users = await response.json();

      const user = users.find((user: { email: string, senha: string }) => 
        user.email === useremail && user.senha === password
      );

      if (user) {
        navigate('/'); // dashboard
      } else {
        setErrorMessage('Usuário ou senha incorretos');
      }
    } catch (error) {
      setErrorMessage('Erro ao tentar fazer login');
    }
  };

  return (
    <form className="login-form" onSubmit={handleLogin}>
      <p className="login-instruction">Please log in using your employee credentials</p>

      <div className="form-group">
        <label htmlFor="useremail">Email</label>
        <input 
          type="text" 
          id="useremail" 
          name="useremail" 
          value={useremail}
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
          value={password}
          onChange={(e) => setPassword(e.target.value)} 
          required 
        />
      </div>

      {errorMessage && <p className="error-message">{errorMessage}</p>}

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