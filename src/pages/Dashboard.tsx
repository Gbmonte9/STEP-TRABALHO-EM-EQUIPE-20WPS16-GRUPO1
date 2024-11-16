import React, { useState, useEffect, useMemo } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Carteira from '../classes/Carteira.ts';
import Despesa from '../classes/Despesa.ts';
import Renda from '../classes/FonteDeRenda.ts';

import '../styles/Carteira.css';

type CarteiraSimplificada = {
  id: number;
  nome: string;
  moeda: string;
  saldo: number;
  data: string;
  dataEdicao: string;
  usuarioId: number;
};

interface DespesaSimplificada {
  id: number;
  descricao: string;
  categoria: string;
  valor: number;
  date: string;
  carteiraId: number; 
  usuarioId: number;
};

interface RendaSimplificada {
  id: number;
  nome: string;
  valor: number;
  data: string;
  categoria: string;
  usuarioId: number; 
};

const Dashboard: React.FC = () => {
  const [carteiras, setCarteiras] = useState<CarteiraSimplificada[]>([]);
  const [despesas, setDespesas] = useState<DespesaSimplificada[]>([]);
  const [rendas, setRendas] = useState<RendaSimplificada[]>([]);
  const [usuarioId, setUsuarioId] = useState<number | null>(null);

  useEffect(() => {
    const storedId = localStorage.getItem('usuarioId');
    if (storedId) {
      setUsuarioId(parseInt(storedId, 10));
    }
  }, []);

  const loadData = async (usuarioId: number) => {
    try {
      const carteiraInstance = new Carteira();
      const carteirasAtualizadas = await carteiraInstance.listarCarteiras(usuarioId);
      setCarteiras(carteirasAtualizadas.map(carteira => ({
        id: carteira.getId(),
        nome: carteira.getNome(),
        moeda: carteira.getMoeda(),
        saldo: carteira.getSaldo(),
        data: formatDate(carteira.getDataCriacao()),
        dataEdicao: formatDate(carteira.getDataEdicao()),
        usuarioId: carteira.getUsuarioId(),
      })));

      const despesaInstance = new Despesa();
      const despesaAtualizadas = await despesaInstance.listarDespesa(usuarioId);
      setDespesas(despesaAtualizadas.map(despesa => ({
        id: despesa.getId(),
        descricao: despesa.getDescricao(),
        valor: despesa.getValor(),
        categoria: despesa.getDespensa(),
        data: formatDate(despesa.getData()),
        dataEdicao: formatDate(despesa.getDataEditar()),
        carteiraId: despesa.getCarteiraId(),
        usuarioId: despesa.getUsuarioId(),
        date: formatDate(despesa.getData())
      })))


      const rendaInstance = new Renda();
      const rendasAtualizadas = await rendaInstance.listarRenda(usuarioId);
      setRendas(rendasAtualizadas.map(renda => ({
        id: renda.getId(),
        nome: renda.getNome(),
        valor: renda.getValor(),
        categoria: renda.getCategoria(),
        data: formatDate(renda.getData()),
        dataEdicao: formatDate(renda.getDataEditar()),
        usuarioId: renda.getUsuarioId(),
      })));
    } catch (error) {
      console.error('Erro ao carregar os dados:', error);
    }
  };

  useEffect(() => {
    if (usuarioId) {
      loadData(usuarioId);
    }
  }, [usuarioId]);

  const formatDate = (date: Date | undefined): string => {
    return date && !isNaN(date.getTime()) ? date.toISOString() : new Date().toISOString();
  };

  const saldoTotalCarteiras = useMemo(() => carteiras.reduce((total, carteira) => total + carteira.saldo, 0), [carteiras]);

  const totalDespesas = useMemo(() => {
    const total = despesas.reduce((acc, despesa) => {
      const valor = Number(despesa.valor) || 0;
      return acc + valor;
    }, 0);
    return total;
  }, [despesas]);

  const formatTotalDespesas = (total: number) => {
    return isNaN(total) ? 0 : total.toFixed(2);
  };

  const totalRenda = useMemo(() => 
    rendas.reduce((total, fonte) => total + fonte.valor, 0), 
    [rendas]
  );

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
              <h4 className="card-title">
                R$ {formatTotalDespesas(totalDespesas)}
              </h4>
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
          {despesas.length > 0 ? (
            <ul className="list-group">
              {despesas.slice(0, 5).map((despesa) => (
                <li key={despesa.id} className="list-group-item d-flex justify-content-between align-items-center">
                  {despesa.descricao} - R$ {Number(despesa.valor).toFixed(2)} 
                  <span className="badge bg-secondary rounded-pill">{despesa.categoria}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p>Nenhuma despesa registrada.</p>
          )}
        </div>

        <div className="col-md-6">
          <h4>Fontes de Renda Recentes</h4>
          {rendas.length > 0 ? (
            <ul className="list-group">
              {rendas.slice(0, 5).map((renda) => (
                <li key={renda.id} className="list-group-item d-flex justify-content-between align-items-center">
                  {renda.nome} - R$ {renda.valor.toFixed(2)}
                  <span className="badge bg-dark rounded-pill">{renda.categoria}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p>Nenhuma fonte de renda registrada.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;