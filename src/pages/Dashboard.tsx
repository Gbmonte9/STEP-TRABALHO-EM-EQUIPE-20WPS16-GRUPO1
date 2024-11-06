import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const Dashboard: React.FC = () => {
  
  const carteiras = [
    { id: 1, nome: 'Carteira Principal', moeda: 'BRL', saldo: 1500.75, data: '2024-11-05', usuarioId: 1 },
    { id: 2, nome: 'Investimentos', moeda: 'BRL', saldo: 5000.00, data: '2024-11-05', usuarioId: 1 },
  ];

  const despesas = [
    { id: 1, descricao: 'Supermercado', valor: 250.00, data: '2024-11-04', categoria: 'Alimentação', carteiraId: 1 },
    { id: 2, descricao: 'Academia', valor: 120.00, data: '2024-11-03', categoria: 'Saúde', carteiraId: 1 },
    { id: 3, descricao: 'Transporte', valor: 45.00, data: '2024-11-02', categoria: 'Transporte', carteiraId: 1 },
  ];

  const fontesRenda = [
    { id: 1, nome: 'Salário', valor: 3000.00, data: '2024-10-30', categoria: 'Salário', usuarioId: 1 },
    { id: 2, nome: 'Freelance', valor: 500.00, data: '2024-10-25', categoria: 'Freelance', usuarioId: 1 },
  ];

  const saldoTotalCarteiras = carteiras.reduce((total, carteira) => total + carteira.saldo, 0);
  const totalDespesas = despesas.reduce((total, despesa) => total + despesa.valor, 0);
  const totalRenda = fontesRenda.reduce((total, fonte) => total + fonte.valor, 0);

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Visão Geral do Dashboard</h2>

      <div className="row">
        <div className="col-md-4">
          <div className="card text-white bg-dark mb-3">
            <div className="card-header">Saldo Total das Carteiras</div>
            <div className="card-body">
              <h4 className="card-title">R$ {saldoTotalCarteiras.toFixed(2)}</h4>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card text-white bg-secondary mb-3">
            <div className="card-header">Total de Despesas</div>
            <div className="card-body">
              <h4 className="card-title">R$ {totalDespesas.toFixed(2)}</h4>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card text-white bg-dark mb-3">
            <div className="card-header">Total de Renda</div>
            <div className="card-body">
              <h4 className="card-title">R$ {totalRenda.toFixed(2)}</h4>
            </div>
          </div>
        </div>
      </div>

      <div className="row mt-4">
        <div className="col-md-6">
          <h4>Despesas Recentes</h4>
          <ul className="list-group">
            {despesas.slice(0, 5).map((despesa) => (
              <li key={despesa.id} className="list-group-item d-flex justify-content-between align-items-center">
                {despesa.descricao} - R$ {despesa.valor.toFixed(2)}
                <span className="badge bg-secondary rounded-pill">{despesa.categoria}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="col-md-6">
          <h4>Fontes de Renda Recentes</h4>
          <ul className="list-group">
            {fontesRenda.slice(0, 5).map((fonte) => (
              <li key={fonte.id} className="list-group-item d-flex justify-content-between align-items-center">
                {fonte.nome} - R$ {fonte.valor.toFixed(2)}
                <span className="badge bg-dark rounded-pill">{fonte.categoria}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;