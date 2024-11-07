import React, { useState } from 'react';

function Usuario() {
  const [usuario, setUsuario] = useState({
    id: 1,
    nome: 'João Silva',
    email: 'joao@example.com',
    senha: '123456',
    dataCadastro: new Date('2023-01-01'),
  });
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [novoNome, setNovoNome] = useState('');
  const [novoEmail, setNovoEmail] = useState('');

  // Método para cadastrar um novo usuário
  const cadastrar = () => {
    console.log('Usuário cadastrado');
    // Simular o cadastro com os dados fornecidos
  };

  // Método para fazer login
  const fazerLogin = () => {
    setIsLoggedIn(true);
    console.log('Usuário logado');
  };

  // Método para editar o perfil do usuário
  const editarPerfil = () => {
    setUsuario({
      ...usuario,
      nome: novoNome || usuario.nome,
      email: novoEmail || usuario.email,
    });
    console.log('Perfil editado');
  };

  // Método para excluir a conta
  const excluirConta = () => {
    setUsuario(null);
    console.log('Conta excluída');
  };

  // Método para recuperar a senha
  const recuperarSenha = () => {
    console.log('Senha recuperada');
    // Lógica de recuperação de senha
  };

  return (
    <div className="usuario-container">
      <h2>Perfil do Usuário</h2>
      {usuario && (
        <div>
          <p><strong>Nome:</strong> {usuario.nome}</p>
          <p><strong>Email:</strong> {usuario.email}</p>
          <p><strong>Data de Cadastro:</strong> {usuario.dataCadastro.toLocaleDateString()}</p>
          
          {isLoggedIn ? (
            <div>
              <button onClick={editarPerfil}>Editar Perfil</button>
              <button onClick={excluirConta}>Excluir Conta</button>
              <button onClick={recuperarSenha}>Recuperar Senha</button>
            </div>
          ) : (
            <button onClick={fazerLogin}>Fazer Login</button>
          )}
        </div>
      )}
      {!usuario && <p>Conta excluída.</p>}

      {/* Campos para editar perfil */}
      {isLoggedIn && (
        <div>
          <h3>Editar Perfil</h3>
          <input
            type="text"
            placeholder="Novo nome"
            value={novoNome}
            onChange={(e) => setNovoNome(e.target.value)}
          />
          <input
            type="email"
            placeholder="Novo email"
            value={novoEmail}
            onChange={(e) => setNovoEmail(e.target.value)}
          />
          <button onClick={editarPerfil}>Salvar Alterações</button>
        </div>
      )}
    </div>
  );
}

export default Usuario;
