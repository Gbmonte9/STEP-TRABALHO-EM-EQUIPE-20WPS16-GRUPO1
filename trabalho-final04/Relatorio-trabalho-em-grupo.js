import React, { useState } from 'react';

function Relatorio({ usuarioId }) {
  const [relatorio, setRelatorio] = useState({
    periodo: 'Janeiro de 2024',
    totalReceitas: 3500,
    totalDespesas: 1200,
    saldo: 2300,
    usuarioId,
  });

  const gerarRelatorio = () => {
    setRelatorio({
      ...relatorio,
      saldo: relatorio.totalReceitas - relatorio.totalDespesas,
    });
  };

  return (
    <div>
      <button onClick={gerarRelatorio}>Gerar Relatório</button>
      <h4>Relatório de {relatorio.periodo}</h4>
      <p><strong>Total de Receitas:</strong> R${relatorio.totalReceitas}</p>
      <p><strong>Total de Despesas:</strong> R${relatorio.totalDespesas}</p>
      <p><strong>Saldo:</strong> R${relatorio.saldo}</p>
    </div>
  );
}

export default Relatorio;
