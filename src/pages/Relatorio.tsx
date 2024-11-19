import React, { useState, useEffect, useMemo } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Legend, Tooltip, LabelList } from 'recharts';
import { PieChart, Pie, Cell, Tooltip as PieTooltip } from 'recharts';
import Carteira from "../classes/Carteira.ts";
import Despesa from "../classes/Despesa.ts";
import Renda from "../classes/FonteDeRenda.ts";
const COLORS = ['#0088FE', '#FF8042', '#FFBB28'];

const taxasDeCambio: {
  USD: number;
  EUR: number;
  GBP: number;
  JPY: number;
  BTC: number;
  BRL: number;
} = {
  USD: 5.3,
  EUR: 5.5,
  GBP: 6.5,
  JPY: 0.035,
  BTC: 150000,
  BRL: 1,
};

type CarteiraSimplificada = {
  id: number;
  nome: string;
  moeda: string;
  saldo: number;
  data: string;
  dataEdicao: string;
  usuarioId: number;
};

type DespesaSimplificada = {
  id: number;
  descricao: string;
  valor: string;
  categoria: string;
  data: string;
  dataEdicao: string;
  carteiraId: number;
  usuarioId: number;
};

type RendaSimplificada = {
  id: number;
  nome: string;
  valor: number;
  categoria: string;
  data: string;
  dataEdicao: string;
  usuarioId: number;
};

interface CustomizedLabelProps {
  cx: number;
  cy: number;
  midAngle: number;
  innerRadius: number;
  outerRadius: number;
  value: number;
  index: number;
}


const Relatorio = () => {
  const [carteiras, setCarteiras] = useState<CarteiraSimplificada[]>([]);
  const [despesas, setDespesas] = useState<DespesaSimplificada[]>([]);
  const [rendas, setRendas] = useState<RendaSimplificada[]>([]);
  const [usuarioId, setUsuarioId] = useState<number | null>(null);
  const [totalReceitas, setTotalReceitas] = useState<number>(0);
  const [totalDespesa, setTotalDespesa] = useState<number>(0);
  const [saldoTotalCarteira, setSaldoTotalCarteira] = useState<number>(0);
  const [dataLinha, setDataLinha] = useState<any[]>([]);

  useEffect(() => {
    const storedId = localStorage.getItem('usuarioId');
    if (storedId) {
      setUsuarioId(parseInt(storedId, 10));
    }
  }, []); 

  useEffect(() => {
    if (usuarioId === null) {
      return; 
    }

    const loadData = async () => {
      try {
       
        const carteiraInstance = new Carteira();
        const carteirasAtualizadas = await carteiraInstance.listarCarteiras(usuarioId);
        setCarteiras(carteirasAtualizadas.map((carteira) => ({
          id: carteira.getId(),
          nome: carteira.getNome(),
          moeda: carteira.getMoeda(),
          saldo: carteira.getSaldo(),
          data: formatDate(carteira.getDataCriacao()),
          dataEdicao: formatDate(carteira.getDataEdicao()),
          usuarioId: carteira.getUsuarioId(),
        })));

   
        const despesaInstance = new Despesa();
        const despesasAtualizadas = await despesaInstance.listarDespesa(usuarioId);
        setDespesas(despesasAtualizadas.map((despesa) => ({
          id: despesa.getId(),
          descricao: despesa.getDescricao(),
          valor: despesa.getValor().toString(),
          categoria: despesa.getDespensa(),
          data: formatDate(despesa.getData()),
          dataEdicao: formatDate(despesa.getDataEditar()),
          carteiraId: despesa.getCarteiraId(),
          usuarioId: despesa.getUsuarioId(),
        })));

     
        const rendaInstance = new Renda();
        const rendasAtualizadas = await rendaInstance.listarRenda(usuarioId);
        setRendas(rendasAtualizadas.map((renda) => ({
          id: renda.getId(),
          nome: renda.getNome(),
          valor: renda.getValor(),
          categoria: renda.getCategoria(),
          data: renda.getData() && !isNaN(renda.getData().getTime())
            ? renda.getData().toISOString()
            : new Date().toISOString(), 
          dataEdicao: renda.getDataEditar() instanceof Date && !isNaN(renda.getDataEditar().getTime())
            ? renda.getDataEditar().toISOString()
            : new Date().toISOString(),
          usuarioId: renda.getUsuarioId(),
        })));

    
        const totalReceitas = rendasAtualizadas.reduce((acc, renda) => acc + (Number(renda.getValor()) || 0), 0);
        const totalDespesas = despesasAtualizadas.reduce((acc, despesa) => acc + (Number(despesa.getValor()) || 0), 0);

        const saldoTotalRealmente = carteirasAtualizadas.reduce((total, carteira) => {
          const moedaCarteira = carteira.getMoeda() as keyof typeof taxasDeCambio;
          const taxaDeCambio = taxasDeCambio[moedaCarteira] || 1;
        
          return total + Number(carteira.getSaldo()) * taxaDeCambio;
        }, 0);

        setTotalReceitas(totalReceitas);
        setTotalDespesa(totalDespesas);
        setSaldoTotalCarteira(saldoTotalRealmente);

      } catch (error) {
        console.error("Erro ao carregar dados", error);
      }
    };

    loadData();
  }, [usuarioId]);

  const formatDate = (date: Date | undefined): string => {
    return date && !isNaN(date.getTime()) ? date.toISOString() : new Date().toISOString();
  };

  const gerarDados = () => {
  
    const formatarDataR = (data: string | Date | undefined): string => {
      if (!data) {
        return '01/01/1970'; 
      }

      if (data instanceof Date) {
        return `${String(data.getDate()).padStart(2, '0')}/${String(data.getMonth() + 1).padStart(2, '0')}/${data.getFullYear()}`;
      }
  
      const d = new Date(data);
  
      if (isNaN(d.getTime())) {
        return '01/01/1970'; 
      }
  
      return `${String(d.getDate()).padStart(2, '0')}/${String(d.getMonth() + 1).padStart(2, '0')}/${d.getFullYear()}`;
    };
  
    const receita = rendas?.reduce((acc, renda) => acc + (Number(renda.valor) || 0), 0) || 0;
    const despesa = despesas?.reduce((acc, despesa) => acc + (Number(despesa.valor) || 0), 0) || 0;
    const saldoTotalRealmente = carteiras.reduce((total, carteira) => {
      const moedaCarteira = carteira.moeda as keyof typeof taxasDeCambio;
      const taxaDeCambio = taxasDeCambio[moedaCarteira] || 1;
    
      return total + Number(carteira.saldo) * taxaDeCambio;
    }, 0);


    const saldoFinalCarteira = receita - despesa + saldoTotalRealmente;
  

    const dataAtual = new Date();
    const nomeMes = `${String(dataAtual.getDate()).padStart(2, '0')}/${String(dataAtual.getMonth() + 1).padStart(2, '0')}/${dataAtual.getFullYear()}`;
  
    const dataUltimaAtualizacaoCarteira = formatarDataR(carteiras?.[carteiras.length - 1]?.dataEdicao || carteiras?.[carteiras.length - 1]?.data);
    const dataUltimaAtualizacaoRenda = formatarDataR(rendas?.[rendas.length - 1]?.dataEdicao || rendas?.[rendas.length - 1]?.data);
    const dataUltimaAtualizacaoDespesa = formatarDataR(despesas?.[despesas.length - 1]?.dataEdicao || despesas?.[despesas.length - 1]?.data);
  
    return {
      name: nomeMes,
      receita,
      despesa,
      carteira: saldoFinalCarteira,
      dataCarteira: dataUltimaAtualizacaoCarteira, 
      dataRenda: dataUltimaAtualizacaoRenda, 
      dataDespesa: dataUltimaAtualizacaoDespesa, 
    };
  };
  
  useEffect(() => {
    
    if (rendas && despesas && carteiras) {
      const intervalo = setInterval(() => {
        setDataLinha((prevData) => {
          const novosDados = [...prevData, gerarDados()];
  
          
          if (novosDados.length > 2) {
            novosDados.shift();
          }
          return novosDados;
        });
      }, 5000); 
  

      return () => clearInterval(intervalo);
    }
  }, [rendas, despesas, carteiras]); 
  const dataPizza = [
    { name: 'Receitas', value: totalReceitas},
    { name: 'Despesas', value: totalDespesa},
    { name: 'Carteira', value: saldoTotalCarteira },
  ];

  const renderCustomizedLabel = ({
    cx, cy, midAngle, innerRadius, outerRadius, value, index
  }: CustomizedLabelProps) => {
    const RADIAN = Math.PI / 180;
    const angle = midAngle * RADIAN;
    const x = cx + (outerRadius + 10) * Math.cos(angle);
    const y = cy + (outerRadius + 10) * Math.sin(angle);

    const percent = totalReceitas > 0 ? (value / totalReceitas) * 100 : 0;
    const itemName = dataPizza?.[index]?.name || 'Indefinido';

    return (
      <text
        x={x}
        y={y}
        fill="#000"
        textAnchor="middle"
        dominantBaseline="middle"
        fontSize="14"
        aria-label={`${itemName}: ${percent.toFixed(0)}%`}
      >
        {`${itemName}: ${percent.toFixed(0)}%`}
      </text>
    );
  };

  function PieChartComponent() {
    if (!dataPizza || dataPizza.length === 0) {
      return <p className="text-center">Nenhum dado disponível para exibir o gráfico.</p>;
    }

    return (
      <div className="container mt-5">
        <h2 className="text-center mb-4">Relatório Financeiro</h2>

        <div className="row mb-4">
          <div className="col-12">
            <div className="card shadow-sm">
              <div className="card-body">
                <h4 className="card-title text-center">Receitas, Despesas e Carteira em Tempo Real</h4>
                <ResponsiveContainer width="100%" height={window.innerWidth < 768 ? 300 : 400}>
                  <LineChart data={dataLinha}>
                    <CartesianGrid strokeDasharray="5 5" stroke="#ddd" />
                    <XAxis dataKey="name" tick={{ fontSize: 12 }} tickLine={false} />
                    <YAxis tick={{ fontSize: 12 }} tickLine={false} />
                    <Line 
                      type="monotone" 
                      dataKey="receita" 
                      stroke="#0088FE" 
                      strokeWidth={3} 
                      dot={false} 
                      activeDot={{ r: 8 }} 
                    />
                    <Line 
                      type="monotone" 
                      dataKey="despesa" 
                      stroke="#FF8042" 
                      strokeWidth={3} 
                      dot={false} 
                      activeDot={{ r: 8 }} 
                    />
                    <Line 
                      type="monotone" 
                      dataKey="carteira" 
                      stroke="#FFBB28" 
                      strokeWidth={3} 
                      dot={false} 
                      activeDot={{ r: 8 }} 
                    />
                    <Tooltip 
                      wrapperStyle={{ fontSize: '14px' }} 
                      contentStyle={{ backgroundColor: '#fff', borderRadius: '5px', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' }}
                    />
                    <Legend 
                      verticalAlign="top" 
                      height={36} 
                      wrapperStyle={{ lineHeight: '40px' }} 
                    />
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
                <h4 className="card-title text-center">Distribuição das Receitas</h4>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={dataPizza}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={renderCustomizedLabel}
                      outerRadius={100}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {dataPizza.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <PieTooltip />
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
                <p className="card-text">
                  R$ {((totalReceitas || 0) + (totalDespesa || 0)).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                </p>
              </div>
            </div>
        </div>

        <div className="col-lg-6">
          <div className="card shadow-sm">
              <div className="card-body">
                  <h5 className="card-title">Carteira</h5>
                  <p className="card-text">
                    R${saldoTotalCarteira?.toString()}
                  </p>
                </div>
              </div>
          </div>
        </div>

        <div className="row mb-4">
          <div className="col-lg-12">
            <div className="card shadow-sm">
              <div className="card-body">
                <h5 className="card-title">Despesas</h5>
                {despesas && despesas.length > 0 ? (
                  <ul className="list-group">
                    {despesas.map((despesa: any, index: number) => (
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
                {rendas && rendas.length > 0 ? (
                  <ul className="list-group">
                    {rendas.map((renda: any, index: number) => (
                      <li className="list-group-item" key={index}>
                        {renda.nome}: R${renda.valor}
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

  return <PieChartComponent />;
};

export default Relatorio;