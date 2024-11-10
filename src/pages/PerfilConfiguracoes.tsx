import Usuario from "../classes/Usuario.ts";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const PerfilConfiguracoes = () => {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");
  const [usuarioId, setUsuarioId] = useState<number | null>(null); 
  const navigate = useNavigate(); 

  useEffect(() => {
    const storedId = localStorage.getItem("usuarioId");

    if (storedId) {
      setUsuarioId(parseInt(storedId, 10)); 
    }
  }, []);

  useEffect(() => {
    const localizarUsuario = async () => {
      if (usuarioId) {
        const usuario = new Usuario();
        console.log("Attempting to locate user with ID:", usuarioId);
        const encontrado = await usuario.localizarUsuario(usuarioId);
  
        if (encontrado) {
          setNome(usuario.getNome());
          setEmail(usuario.getEmail());
          setSenha(usuario.getSenha());
          setConfirmarSenha(usuario.getSenha());
          console.log("Perfil carregado com sucesso!");
        } else {
          console.log("Falha ao carregar o perfil.");
        }
      } else {
        console.log("ID de usuário não encontrado.");
      }
    };
    localizarUsuario();
  }, [usuarioId]);

  const editarPerfil = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!usuarioId) {
      console.log("ID de usuário não encontrado.");
      return;
    }

    const usuario = new Usuario();
    usuario.setNome(nome);
    usuario.setEmail(email);
    usuario.setSenha(senha);

    const dataEditar = new Date(); 
    const sucesso = await usuario.editarUsuario(usuarioId, nome, email, senha, dataEditar);

    if (sucesso) {
      console.log("Perfil atualizado com sucesso!");
    } else {
      console.log("Falha ao atualizar perfil.");
    }
  };

  const excluirConta = async () => {
    if (!usuarioId) {
      console.log("ID de usuário não encontrado.");
      return;
    }

    const confirmacao = window.confirm(
      "Tem certeza que deseja excluir sua conta? Esta ação não pode ser revertida."
    );
    if (confirmacao) {
      const usuario = new Usuario();
      const sucesso = await usuario.excluirConta(usuarioId);

      if (sucesso) {
        console.log("Conta excluída com sucesso!");
        navigate("/login"); 
      } else {
        console.log("Falha ao excluir a conta.");
      }
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
          <button type="submit" className="btn btn-dark">
            Atualizar Perfil
          </button>
        </div>
      </form>

      <hr />

      <div className="text-center">
        <button onClick={excluirConta} className="btn btn-secondary">
          Excluir Conta
        </button>
      </div>
    </div>
  );
};

export default PerfilConfiguracoes;