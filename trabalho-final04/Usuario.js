import React, { useState } from 'react';

function Usuario({ nome, email, senha, dataCadastro }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const cadastrar = () => {
    console.log('Usuário cadastrado');
    // Lógica de cadastro
  };

  const fazerLogin = () => {
    setIsLoggedIn(true);
    console.log('Usuário logado');
    // Lógica de login
  };

  const editarPerfil = () => {
    console.log('Editar perfil');
    // Lógica de editar perfil
  };

  const excluirConta = () => {
    console.log('Conta excluída');
    // Lógica de excluir conta
  };

  const recuperarSenha = () => {
    console.log('Recuperar senha');
    // Lógica de recuperação de senha
  };

  return (
    <div>
      <h2>Usuário: {nome}</h2>
      <p>Email: {email}</p>
      <p>Data de Cadastro: {dataCadastro}</p>
      {!isLoggedIn ? (
        <button onClick={fazerLogin}>Fazer Login</button>
      ) : (
        <button onClick={editarPerfil}>Editar Perfil</button>
      )}
      <button onClick={excluirConta}>Excluir Conta</button>
      <button onClick={recuperarSenha}>Recuperar Senha</button>
    </div>
  );
}

export default Usuario;
