import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

interface Despesa {
  id: number;
  descricao: string;
  valor: number;
  date: string;
  categoria: string;
  carteiraId: number; 
}

const categorias = [
  'Alimentação',
  'Transporte',
  'Saúde',
  'Educação',
  'Lazer',
  'Outras',
];

const Despesas: React.FC = () => {
  const [despesas, setDespesas] = useState<Despesa[]>([]);
  const [descricao, setDescricao] = useState('');
  const [valor, setValor] = useState<number | ''>(''); 
  const [date, setDate] = useState('');
  const [categoria, setCategoria] = useState(categorias[0]);
  const carteiraId = 1;

  const adicionarDespesa = async (e: React.FormEvent) => {
    e.preventDefault();
    if (descricao && valor !== '' && date && categoria) {
      const novaDespesa: Omit<Despesa, 'id'> = {
        descricao,
        valor: Number(valor),
        date,
        categoria,
        carteiraId,
      };

      const idGerado = Math.floor(Math.random() * 1000); 
      const despesaComId: Despesa = { ...novaDespesa, id: idGerado };

      setDespesas([...despesas, despesaComId]);
      setDescricao('');
      setValor('');
      setDate('');
      setCategoria(categorias[0]);
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Adicionar Despesa</h2>
      <div className="card mb-4" style={{ borderRadius: '8px' }}>
        <div className="card-body">
          <form onSubmit={adicionarDespesa}>
            <div className="mb-3">
              <label htmlFor="descricao" className="form-label">Descrição da Despesa:</label>
              <input
                type="text"
                id="descricao"
                className="form-control"
                value={descricao}
                onChange={(e) => setDescricao(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="valor" className="form-label">Valor:</label>
              <input
                type="number"
                id="valor"
                className="form-control"
                value={valor}
                onChange={(e) => setValor(e.target.value === '' ? '' : Number(e.target.value))}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="categoria" className="form-label">Categoria:</label>
              <select
                id="categoria"
                className="form-select"
                value={categoria}
                onChange={(e) => setCategoria(e.target.value)}
              >
                {categorias.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>
            <button type="submit" className="btn btn-primary">Adicionar Despesa</button>
          </form>
        </div>
      </div>

      <h3>Despesas Adicionadas</h3>
      <ul className="list-group">
        {despesas.map((despesa) => (
          <li key={despesa.id} className="list-group-item">
            {despesa.descricao} - R$ {despesa.valor.toFixed(2)} - {despesa.date} - {despesa.categoria}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Despesas;