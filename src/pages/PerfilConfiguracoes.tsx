import React, { useState } from "react";

const PerfilConfiguracoes = () => {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");

  const editarPerfil = (e: React.FormEvent) => {
    e.preventDefault();
    if (senha === confirmarSenha) {
      console.log("Perfil atualizado com sucesso!");
    } else {
      console.log("As senhas não coincidem!");
    }
  };

  const excluirConta = () => {
    const confirmacao = window.confirm(
      "Tem certeza que deseja excluir sua conta? Esta ação não pode ser revertida."
    );
    if (confirmacao) {
      console.log("Conta excluída!");
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Configurações do Perfil</h2>
      <form onSubmit={editarPerfil} className="form-group">
        <div className="mb-3">
          <label htmlFor="formNome" className="form-label">
            Nome
          </label>
          <input
            id="formNome"
            type="text"
            className="form-control"
            placeholder="Digite seu nome"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="formEmail" className="form-label">
            Email
          </label>
          <input
            id="formEmail"
            type="email"
            className="form-control"
            placeholder="Digite seu email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="formSenha" className="form-label">
            Nova Senha
          </label>
          <input
            id="formSenha"
            type="password"
            className="form-control"
            placeholder="Digite uma nova senha"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="formConfirmarSenha" className="form-label">
            Confirmar Senha
          </label>
          <input
            id="formConfirmarSenha"
            type="password"
            className="form-control"
            placeholder="Confirme sua nova senha"
            value={confirmarSenha}
            onChange={(e) => setConfirmarSenha(e.target.value)}
          />
        </div>

        <div className="text-center mt-4">
          <button type="submit" className="btn btn-success">
            Atualizar Perfil
          </button>
        </div>
      </form>

      <hr />

      <div className="text-center">
        <button onClick={excluirConta} className="btn btn-danger">
          Excluir Conta
        </button>
      </div>
    </div>
  );
};

export default PerfilConfiguracoes;