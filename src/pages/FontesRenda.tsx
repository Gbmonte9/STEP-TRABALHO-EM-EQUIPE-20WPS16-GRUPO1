import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

interface FonteRenda {
  id: number;
  nome: string;
  valor: number;
  data: string;
  categoria: string;
  usuarioId: number; 
}

const categorias = [
  'Salário',
  'Freelance',
  'Investimentos',
  'Venda de Produtos',
  'Aluguel',
  'Outras',
];

const FontesRenda: React.FC = () => {
  const [fontes, setFontes] = useState<FonteRenda[]>([]);
  const [nome, setNome] = useState('');
  const [valor, setValor] = useState<number | ''>(''); 
  const [data, setData] = useState('');
  const [categoria, setCategoria] = useState(categorias[0]);
  const usuarioId = 1; 

  const adicionarFonte = async (e: React.FormEvent) => {
    e.preventDefault();
    if (nome && valor !== '' && data && categoria) {
      const novaFonte: Omit<FonteRenda, 'id'> = {
        nome,
        valor: Number(valor),
        data,
        categoria,
        usuarioId,
      };

      const idGerado = Math.floor(Math.random() * 1000); 
      const fonteComId: FonteRenda = { ...novaFonte, id: idGerado };

      setFontes([...fontes, fonteComId]);
      setNome('');
      setValor('');
      setData('');
      setCategoria(categorias[0]);
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Adicionar Fonte de Renda</h2>
      <div className="card mb-4" style={{ borderRadius: '8px' }}>
        <div className="card-body">
          <form onSubmit={adicionarFonte}>
            <div className="mb-3">
              <label htmlFor="nome" className="form-label">Nome da Fonte:</label>
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
            <button type="submit" className="btn btn-dark">Adicionar Fonte</button>
          </form>
        </div>
      </div>

      <h3>Fontes de Renda Adicionadas</h3>
      <ul className="list-group">
        {fontes.map((fonte) => (
          <li key={fonte.id} className="list-group-item">
            {fonte.nome} - R$ {fonte.valor.toFixed(2)} - {fonte.data} - {fonte.categoria}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FontesRenda;