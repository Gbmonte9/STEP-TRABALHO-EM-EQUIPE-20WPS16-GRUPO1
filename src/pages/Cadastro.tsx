<<<<<<< HEAD
import Usuario from '../classes/Bruno-class/Usuario';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';  // Importa o gerador de UUID
=======
import React, { useState } from 'react';
import Usuario from '../classes/Usuario.ts';
import { Link, useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
>>>>>>> dev
import '../styles/Cadastro.css';

const Cadastro = () => {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
<<<<<<< HEAD
  const [confirmSenha, setConfirmSenha] = useState('');

  const handleCadastro = (e: React.FormEvent) => {
    e.preventDefault();

    if (senha !== confirmSenha) {
      alert('As senhas não coincidem.');
      return;
    }

    function uuidToSimpleNumber(uuid: string): number {
      const trimmedUUID = uuid.replace(/-/g, '').slice(0, 15); 
      return parseInt(trimmedUUID, 16);
    }

    const id = uuidToSimpleNumber(uuidv4());

    const novoUsuario = new Usuario(id, nome, email, senha);

    novoUsuario.cadastrar();

    console.log('Novo usuário criado:', novoUsuario);

    setNome('');
    setEmail('');
    setSenha('');
    setConfirmSenha('');

  };

  return (
    <form className="cadastro-form" onSubmit={handleCadastro}>
      <p className="cadastro-instruction">Por favor, preencha os dados para criar sua conta</p>

      <div className="form-group">
        <label htmlFor="username">Email: </label>
        <input
          type="text"
          id="useremail"
          name="useremail"
          value={email}
=======
  const [confirmarSenha, setConfirmarSenha] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  function uuidToNumber(uuid: string): number {
    let hash = 0;
    for (let i = 0; i < uuid.length; i++) {
      const char = uuid.charCodeAt(i);
      hash = (hash << 5) - hash + char;
      hash = hash & hash;
    }
    return Math.abs(hash);
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (senha !== confirmarSenha) {
      setErrorMessage('As senhas não coincidem!');
      return;
    }

    const id = uuidToNumber(uuidv4());

    const dataAtual = new Date(); 
    const dataEditar = new Date(); 

    const novoUsuario = new Usuario(id, nome, email, senha, dataAtual, dataEditar);

    try {
      const sucesso = await novoUsuario.cadastrarUsuario();
      if (sucesso) {
        setNome('');
        setEmail('');
        setSenha('');
        setConfirmarSenha('');
        setErrorMessage('');
        navigate('/login');  
      } else {
        setErrorMessage(novoUsuario.mensagem);
      }
    } catch (error) {
      setErrorMessage('Ocorreu um erro. Tente novamente mais tarde.');
    }
  };

  return (
    <form className="cadastro-form" onSubmit={handleSubmit}>
      <p className="cadastro-instruction">Por favor, preencha os dados para criar sua conta</p>

      <div className="form-group">
        <label htmlFor="nome">Nome de Usuário</label>
        <input
          type="text"
          id="nome"
          value={nome}
>>>>>>> dev
          onChange={(e) => setNome(e.target.value)}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="email">E-mail</label>
        <input
          type="email"
          id="email"
<<<<<<< HEAD
          name="email"
=======
>>>>>>> dev
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>

      <div className="form-group">
<<<<<<< HEAD
        <label htmlFor="password">Senha</label>
        <input
          type="password"
          id="password"
          name="password"
=======
        <label htmlFor="senha">Senha</label>
        <input
          type="password"
          id="senha"
>>>>>>> dev
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          required
        />
      </div>

      <div className="form-group">
<<<<<<< HEAD
        <label htmlFor="confirm-password">Confirma Senha</label>
        <input
          type="password"
          id="confirm-password"
          name="confirm-password"
          value={confirmSenha}
          onChange={(e) => setConfirmSenha(e.target.value)}
=======
        <label htmlFor="confirmar-senha">Confirmar Senha</label>
        <input
          type="password"
          id="confirmar-senha"
          value={confirmarSenha}
          onChange={(e) => setConfirmarSenha(e.target.value)}
>>>>>>> dev
          required
        />
      </div>

      {errorMessage && <p className="error-message">{errorMessage}</p>}

      <button type="submit" className="btn-cadastro">Cadastrar</button>

      <div className="cadastro-options">
        <Link to="/login" className="login-link">Já tem uma conta? Faça login</Link>
      </div>
    </form>
  );
};

export default Cadastro;