import React, { useState, useEffect } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip as LineTooltip, Legend, ResponsiveContainer } from "recharts";
import { PieChart, Pie, Cell, Tooltip, Legend as PieLegend, Label } from "recharts";

const dataLinha = [
  { name: 'Jan', receita: 400, despesa: 240, carteira: 100 },
  { name: 'Fev', receita: 500, despesa: 300, carteira: 120 },
  { name: 'Mar', receita: 600, despesa: 350, carteira: 150 },
];

const dataPizza = [
  { name: 'Receitas', value: 400 },
  { name: 'Despesas', value: 300 },
  { name: 'Carteira', value: 100 }
];

const COLORS = ['#0088FE', '#FF8042', '#FFBB28'];

const Relatorio = () => {
  const [dadosRelatorio, setDadosRelatorio] = useState<any>(null);

  useEffect(() => {
    setDadosRelatorio({
      receitas: [{ valor: 400 }, { valor: 300 }, { valor: 500 }],
      despesas: [{ valor: 200, descricao: 'Aluguel' }, { valor: 150, descricao: 'Água e Luz' }, { valor: 100, descricao: 'Transporte' }],
      fontesDeRenda: [{ fonte: 'Salário', valor: 500 }, { fonte: 'Freelance', valor: 300 }],
      carteira: 100,
      saldoTotal: 800
    });
  }, []);

  const renderCustomizedLabel = ({
    cx, cy, midAngle, innerRadius, outerRadius, value, index
  }: any) => {
    const RADIAN = Math.PI / 180;
    const angle = midAngle * RADIAN;
    const x = cx + (outerRadius + 10) * Math.cos(angle);
    const y = cy + (outerRadius + 10) * Math.sin(angle);

    const percent = (value / dataPizza.reduce((acc, cur) => acc + cur.value, 0)) * 100;

    return (
      <text x={x} y={y} fill="#000" textAnchor="middle" dominantBaseline="middle" fontSize="14">
        {`${dataPizza[index].name}: ${percent.toFixed(0)}%`}
      </text>
    );
  };

  if (!dadosRelatorio) {
    return <div className="text-center mt-5">Carregando...</div>;
  }

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Relatório Financeiro</h2>

      <div className="row mb-4">
        <div className="col-lg-12">
          <div className="card shadow-sm">
            <div className="card-body">
              <h4 className="card-title text-center">Receitas, Despesas e Carteira ao Longo do Tempo</h4>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={dataLinha}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Line type="monotone" dataKey="receita" stroke="#0088FE" />
                  <Line type="monotone" dataKey="despesa" stroke="#FF8042" />
                  <Line type="monotone" dataKey="carteira" stroke="#FFBB28" />
                  <LineTooltip />
                  <Legend />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>

      <div className="row mb-4">
        <div className="col-lg-12">
          <div className="card shadow-sm">
            <div className="card-body">
              <h4 className="card-title text-center">Distribuição de Receitas, Despesas e Carteira</h4>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={dataPizza}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    labelLine={false}
                    label={renderCustomizedLabel}
                    fill="#8884d8"
                  >
                    {dataPizza.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value: any) => `${value}`} />
                  <PieLegend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>

      <div className="row mb-4">
        <div className="col-lg-6">
          <div className="card shadow-sm">
            <div className="card-body">
              <h5 className="card-title">Saldo Total</h5>
              <p className="card-text">R${dadosRelatorio.saldoTotal}</p>
            </div>
          </div>
        </div>
        <div className="col-lg-6">
          <div className="card shadow-sm">
            <div className="card-body">
              <h5 className="card-title">Carteira</h5>
              <p className="card-text">R${dadosRelatorio.carteira}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="row mb-4">
        <div className="col-lg-12">
          <div className="card shadow-sm">
            <div className="card-body">
              <h5 className="card-title">Despesas</h5>
              {dadosRelatorio.despesas && dadosRelatorio.despesas.length > 0 ? (
                <ul className="list-group">
                  {dadosRelatorio.despesas.map((despesa: any, index: number) => (
                    <li className="list-group-item" key={index}>
                      {despesa.descricao}: R${despesa.valor}
                    </li>
                  ))}
                </ul>
              ) : (
                <p>Nenhuma despesa registrada.</p>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="row mb-4">
        <div className="col-lg-12">
          <div className="card shadow-sm">
            <div className="card-body">
              <h5 className="card-title">Fontes de Renda</h5>
              {dadosRelatorio.fontesDeRenda && dadosRelatorio.fontesDeRenda.length > 0 ? (
                <ul className="list-group">
                  {dadosRelatorio.fontesDeRenda.map((fonte: any, index: number) => (
                    <li className="list-group-item" key={index}>
                      {fonte.fonte}: R${fonte.valor}
                    </li>
                  ))}
                </ul>
              ) : (
                <p>Nenhuma fonte de renda registrada.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Relatorio;