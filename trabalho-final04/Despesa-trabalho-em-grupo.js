import React from 'react';

function Despesas({ transacoes, onRemover }) {
  return (
    <div className="despesas-container">
      <h3>Lista de Despesas</h3>
      <ul>
        {transacoes.map((despesa) => (
          <li key={despesa.id}>
            {despesa.descricao} - R${despesa.valor} ({despesa.categoria}) 
            <button onClick={() => onRemover(despesa.id)}>Remover</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Despesas;
