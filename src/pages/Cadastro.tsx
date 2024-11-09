import Usuario from '../classes/Bruno-class/Usuario';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';  // Importa o gerador de UUID
import '../styles/Cadastro.css';

const Cadastro = () => {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
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
          onChange={(e) => setNome(e.target.value)}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="email">E-mail</label>
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

      <div className="form-group">
        <label htmlFor="confirm-password">Confirma Senha</label>
        <input
          type="password"
          id="confirm-password"
          name="confirm-password"
          value={confirmSenha}
          onChange={(e) => setConfirmSenha(e.target.value)}
          required
        />
      </div>

      <button type="submit" className="btn-cadastro">Cadastrar</button>

      <div className="cadastro-options">
        <Link to="/login" className="login-link">Já tem uma conta? Faça login</Link>
      </div>
    </form>
  );
};

export default Cadastro;