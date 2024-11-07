import React, { useState } from 'react';

function Carteira({ usuarioId }) {
  const [carteiras, setCarteiras] = useState([
    { id: 1, nome: 'Carteira Principal', moeda: 'BRL', saldo: 2000, usuarioId },
  ]);

  const adicionarCarteira = () => {
    const novaCarteira = { id: 2, nome: 'Carteira Investimentos', moeda: 'BRL', saldo: 1500, usuarioId };
    setCarteiras([...carteiras, novaCarteira]);
  };

  return (
    <div>
      <button onClick={adicionarCarteira}>Adicionar Carteira</button>
      <ul>
        {carteiras.map((carteira) => (
          <li key={carteira.id}>{carteira.nome} - Saldo: R${carteira.saldo}</li>
        ))}
      </ul>
    </div>
  );
}

export default Carteira;
