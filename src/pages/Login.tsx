import Usuario from '../classes/Usuario.ts'; 
import { Link, useNavigate } from 'react-router-dom';
import { useState, FormEvent } from 'react';
import '../styles/Login.css';

const Login = () => {
<<<<<<< HEAD
  const [useremail, setEmail] = useState('');
  const [password, setPassword] = useState('');
=======
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
>>>>>>> dev
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent) => {

    e.preventDefault();

<<<<<<< HEAD
      const user = users.find((user: { email: string, senha: string }) => 
        user.email === useremail && user.senha === password
      );
=======
    const usuario = new Usuario();
>>>>>>> dev

    const isLoggedIn = await usuario.usuarioLogin(email, senha);

    if (isLoggedIn) {
      // Recuperando o id e o nome do usuário
      const usuarioId = usuario.getId();
      const usuarioNome = usuario.getNome();

      console.log('Login bem-sucedido, id:', usuarioId, 'nome:', usuarioNome);

      // Armazenar id e nome no localStorage
      localStorage.setItem('usuarioId', usuarioId.toString());
      localStorage.setItem('usuarioNome', usuarioNome);

      // Navegar para a página de destino
      navigate('/');
    } else {
      setErrorMessage('Email e Senha invalida.');
    }
  };

  return (
    <form className="login-form" onSubmit={handleSubmit}>
      <p className="login-instruction">Por favor, faça login com suas credenciais</p>

      <div className="form-group">
<<<<<<< HEAD
        <label htmlFor="useremail">Email</label>
        <input 
          type="text" 
          id="useremail" 
          name="useremail" 
          value={useremail}
=======
        <label htmlFor="email">Email</label>
        <input 
          type="email"  
          id="email" 
          name="email" 
          value={email}
>>>>>>> dev
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