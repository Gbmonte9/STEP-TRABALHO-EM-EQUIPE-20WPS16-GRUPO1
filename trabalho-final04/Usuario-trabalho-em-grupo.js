import React, { useState } from 'react';
import Relatorio from './Relatorio';
import FonteDeRenda from './FonteDeRenda';
import Carteira from './Carteira';

function Usuario() {
  const [usuario, setUsuario] = useState({
    id: 1,
    nome: 'Ana Costa',
    email: 'ana@example.com',
    saldo: 2000,
  });

  return (
    <div className="usuario-container">
      <h2>Perfil do Usuário</h2>
      <p><strong>Nome:</strong> {usuario.nome}</p>
      <p><strong>Email:</strong> {usuario.email}</p>
      <p><strong>Saldo:</strong> R${usuario.saldo}</p>

      <h3>Fontes de Renda</h3>
      <FonteDeRenda usuarioId={usuario.id} />
      
      <h3>Relatórios</h3>
      <Relatorio usuarioId={usuario.id} />
      
      <h3>Carteiras</h3>
      <Carteira usuarioId={usuario.id} />
    </div>
  );
}

export default Usuario;
