import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Vcarteira from '../classes/Carteira';
import Usuario from '../classes/Usuario';
import { v4 as uuidv4 } from 'uuid';

interface ICarteira {
  id: number;
  nome: string;
  moeda: string;
  saldo: number;
  data: string;
  dataEdicao: string;
  usuarioId: number;
}

const moedas = ['BRL', 'USD', 'EUR', 'GBP', 'JPY'];

const Carteira = () => {
  const [carteiras, setCarteiras] = useState<ICarteira[]>([]);
  const [nome, setNome] = useState('');
  const [moeda, setMoeda] = useState(moedas[0]);
  const [saldo, setSaldo] = useState<number>(0); 
  const [usuarioId, setUsuarioId] = useState<number | null>(null);

  function uuidToNumber(uuid: string): number {
    let hash = 0;
    for (let i = 0; i < uuid.length; i++) {
      const char = uuid.charCodeAt(i);
      hash = (hash << 5) - hash + char;
      hash = hash & hash;
    }
    return Math.abs(hash);
  }

  useEffect(() => {
    const storedId = localStorage.getItem('usuarioId');
    if (storedId) {
      setUsuarioId(parseInt(storedId, 10));
    }
  }, []);

  useEffect(() => {
    const localizarUsuario = async () => {
      if (usuarioId) {
        const usuario = new Usuario();
        console.log('Attempting to locate user with ID:', usuarioId);
        const encontrado = await usuario.localizarUsuario(usuarioId);

        if (encontrado) {
          console.log('Usuário encontrado com sucesso!');
        } else {
          console.log('Falha ao carregar o perfil.');
        }
      } else {
        console.log('ID de usuário não encontrado.');
      }
    };

    localizarUsuario();
  }, [usuarioId]);

  useEffect(() => {
    const carregarCarteiras = async () => {
      if (usuarioId !== null && usuarioId !== undefined) {  
        try {
          const vcarteiraInstance = new Vcarteira();
          const carteirasAtualizadas = await vcarteiraInstance.listarCarteiras(usuarioId);
          
          setCarteiras(carteirasAtualizadas.map((carteira) => ({
            id: carteira.getId(),
            nome: carteira.getNome(),
            moeda: carteira.getMoeda(),
            saldo: carteira.getSaldo(),
            data: carteira.getDataCriacao().toISOString(),
            dataEdicao: carteira.getDataEdicao().toISOString(),
            usuarioId: carteira.getUsuarioId(),
          })));

        } catch (error) {
          console.error("Erro ao listar carteiras:", error);
        }
      } else {
        console.warn("usuarioId está indefinido ou é nulo");
      }
    };
  
    carregarCarteiras();
  
  }, [usuarioId]); 

  const adicionarCarteira = async (e: React.FormEvent) => {
    e.preventDefault();
  
    if (!usuarioId) {
      console.log("Erro: ID de usuário não encontrado.");
      return;
    }
  
    const id = uuidToNumber(uuidv4()); 
    const dataAtual = new Date(); 
  
    const novaCarteira = new Vcarteira(id, nome, moeda, saldo, dataAtual, dataAtual, usuarioId);
    
    const sucesso = await novaCarteira.adicionarCarteira(); 

  }

  const veditarCarteira = async (e: React.FormEvent) => {
    e.preventDefault();

    const carteira = new Vcarteira();

      //arteira.editarCarteira()

  }

  const vexcluirCarteira = async (e: React.FormEvent) => {
    e.preventDefault();

    const carteira = new Vcarteira();

      //arteira.excluirCarteira()
    
  }


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
                onChange={(e) => {
                  const value = e.target.value;
                  setSaldo(value === '' ? 0 : Number(value));
                }}
                required
              />
            </div>
            <button type="submit" className="btn btn-dark">Adicionar Carteira</button>
          </form>
        </div>
      </div>

      <div>
        <h3>Carteiras Adicionadas</h3>
        <ul className="list-group">
          {carteiras.map((carteira) => (
            <li key={carteira.id} className="list-group-item d-flex justify-content-between align-items-center">
              <div>
                {carteira.nome} - {carteira.moeda} {carteira.saldo.toFixed(2)} - {carteira.data}
              </div>
              <div>
                <button
                  className="btn btn btn-dark btn-sm me-2"
                  //onClick={() =>  editarCarteira(carteira.id)}
                >
                  Editar
                </button>
                <button
                  className="btn btn btn-secondary btn-sm"
                  //onClick={() => excluirCarteira(carteira.id)}
                >
                  Excluir
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>

    </div>
  );
};

export default Carteira;