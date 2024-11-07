import React, { useState } from 'react';

function Carteira() {
  const [carteira, setCarteira] = useState({
    id: 1,
    nome: 'Carteira Pessoal',
    moeda: 'BRL',
    saldo: 1000,
    dataCriacao: new Date('2023-01-01'),
    usuarioId: 1,
  });

  // Funções relacionadas à carteira
  const adicionar = () => {
    console.log('Carteira adicionada');
  };

  const remover = () => {
    setCarteira(null);
    console.log('Carteira removida');
  };

  const editar = (novoNome, novaMoeda) => {
    setCarteira({
      ...carteira,
      nome: novoNome,
      moeda: novaMoeda,
    });
    console.log('Carteira editada');
  };

  const atualizarSaldo = (valor) => {
    setCarteira({
      ...carteira,
      saldo: carteira.saldo + valor,
    });
    console.log('Saldo atualizado');
  };

  const listarTransacoes = () => {
    console.log('Listando transações');
  };

  return (
    <div className="carteira-container">
      <h2>Carteira</h2>
      {carteira && (
        <div>
          <p><strong>Nome:</strong> {carteira.nome}</p>
          <p><strong>Moeda:</strong> {carteira.moeda}</p>
          <p><strong>Saldo:</strong> {carteira.saldo}</p>
          <p><strong>Data de Criação:</strong> {carteira.dataCriacao.toLocaleDateString()}</p>

          <button onClick={adicionar}>Adicionar Carteira</button>
          <button onClick={() => editar('Carteira Atualizada', 'USD')}>Editar Carteira</button>
          <button onClick={() => atualizarSaldo(500)}>Adicionar Saldo</button>
          <button onClick={remover}>Remover Carteira</button>
        </div>
      )}
    </div>
  );
}

export default Carteira;
