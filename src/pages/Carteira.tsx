import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

interface Carteira {
  id: number;
  nome: string;
  moeda: string;
  saldo: number;
  data: string;
  usuarioId: number;
}

const moedas = [
  'BRL', 
  'USD', 
  'EUR', 
  'GBP', 
  'JPY', 
];

const Carteira: React.FC = () => {
  const [carteiras, setCarteiras] = useState<Carteira[]>([]);
  const [nome, setNome] = useState('');
  const [moeda, setMoeda] = useState(moedas[0]);
  const [saldo, setSaldo] = useState<number | ''>('');
  const [data, setData] = useState('');
  const usuarioId = 1; 

  const adicionarCarteira = (e: React.FormEvent) => {
    e.preventDefault();
    if (nome && saldo !== '' && data) {
      const novaCarteira: Carteira = {
        id: Math.floor(Math.random() * 1000), 
        nome,
        moeda,
        saldo: Number(saldo),
        data,
        usuarioId,
      };

      setCarteiras([...carteiras, novaCarteira]);
      setNome('');
      setMoeda(moedas[0]);
      setSaldo('');
      setData('');
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Adicionar Carteira</h2>
      <div className="card mb-4" style={{ borderRadius: '8px' }}>
        <div className="card-body">
          <form onSubmit={adicionarCarteira}>
            <div className="mb-3">
              <label htmlFor="nome" className="form-label">Nome da Carteira:</label>
              <input
                type="text"
                id="nome"
                className="form-control"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="moeda" className="form-label">Moeda:</label>
              <select
                id="moeda"
                className="form-select"
                value={moeda}
                onChange={(e) => setMoeda(e.target.value)}
              >
                {moedas.map((moeda) => (
                  <option key={moeda} value={moeda}>
                    {moeda}
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-3">
              <label htmlFor="saldo" className="form-label">Saldo Inicial:</label>
              <input
                type="number"
                id="saldo"
                className="form-control"
                value={saldo}
                onChange={(e) => setSaldo(e.target.value === '' ? '' : Number(e.target.value))}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="data" className="form-label">Data:</label>
              <input
                type="date"
                id="data"
                className="form-control"
                value={data}
                onChange={(e) => setData(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="btn btn-primary">Adicionar Carteira</button>
          </form>
        </div>
      </div>

      <h3>Carteiras Adicionadas</h3>
      <ul className="list-group">
        {carteiras.map((carteira) => (
          <li key={carteira.id} className="list-group-item">
            {carteira.nome} - {carteira.moeda} {carteira.saldo.toFixed(2)} - {carteira.data}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Carteira;