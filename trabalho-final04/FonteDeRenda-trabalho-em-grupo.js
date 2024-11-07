import React, { useState } from 'react';

function FonteDeRenda({ usuarioId }) {
  const [fontesRenda, setFontesRenda] = useState([
    { id: 1, nome: 'Salário', valor: 3000, categoria: 'Trabalho', usuarioId },
    { id: 2, nome: 'Investimentos', valor: 500, categoria: 'Investimentos', usuarioId },
  ]);

  const adicionarFonteRenda = () => {
    const novaFonte = { id: 3, nome: 'Freelance', valor: 1000, categoria: 'Trabalho', usuarioId };
    setFontesRenda([...fontesRenda, novaFonte]);
  };

  return (
    <div>
      <button onClick={adicionarFonteRenda}>Adicionar Fonte de Renda</button>
      <ul>
        {fontesRenda.map((fonte) => (
          <li key={fonte.id}>{fonte.nome} - R${fonte.valor} ({fonte.categoria})</li>
        ))}
      </ul>
    </div>
  );
}

export default FonteDeRenda;
