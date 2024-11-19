import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Vcarteira from '../classes/Carteira.ts';
import { v4 as uuidv4 } from 'uuid';
import { format } from 'date-fns';
import '../styles/Carteira.css';

interface ICarteira {
  id: number;
  nome: string;
  moeda: string;
  saldo: number;
  data: string;
  dataEdicao: string;
  usuarioId: number;
}

const moedas = ['BRL', 'USD', 'EUR', 'GBP', 'JPY', 'BTC'];

const Carteira = () => {
  const [carteiras, setCarteiras] = useState<ICarteira[]>([]);
  const [nome, setNome] = useState('');
  const [moeda, setMoeda] = useState(moedas[0]);
  const [saldo, setSaldo] = useState<number>(0); 
  const [usuarioId, setUsuarioId] = useState<number | null>(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [mensagemCarteiraVazia, setMensagemCarteiraVazia] = useState("");
  const [carteiraEditando, setCarteiraEditando] = useState(null);
  const [novoNome, setNovoNome] = useState('');
  const [novaMoeda, setNovaMoeda] = useState('');
  const [novoSaldo, setNovoSaldo] = useState<number>(0);

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
    const carregarCarteiras = async () => {
        if (usuarioId !== null && usuarioId !== undefined) {  
            try {
                const vcarteiraInstance = new Vcarteira();
                const carteirasAtualizadas = await vcarteiraInstance.listarCarteiras(usuarioId);

                if (carteirasAtualizadas.length === 0) {
                    setMensagemCarteiraVazia("Você ainda não possui carteiras.");
                } else {
                    setMensagemCarteiraVazia(""); 
                }

                setCarteiras(carteirasAtualizadas.map((carteira) => ({
                  id: carteira.getId(),
                  nome: carteira.getNome(),
                  moeda: carteira.getMoeda(),
                  saldo: carteira.getSaldo(),
                  data: carteira.getDataCriacao() && !isNaN(carteira.getDataCriacao().getTime())
                  ? carteira.getDataCriacao().toISOString()
                  : new Date().toISOString(), 
                  dataEdicao: carteira.getDataEdicao() && !isNaN(carteira.getDataEdicao().getTime())
                  ? carteira.getDataEdicao().toISOString()
                  : new Date().toISOString(),
                  usuarioId: carteira.getUsuarioId(),
                })));

            } catch (error) {
                console.error("Erro ao listar carteiras:", error);
                setMensagemCarteiraVazia("Erro ao carregar carteiras.");
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
        console.error("Erro: ID de usuário não encontrado.");
        setErrorMessage("Erro: ID de usuário não encontrado.");
        return;
    }

    if (!nome || !moeda || saldo === undefined) {
        console.error("Erro: Todos os campos devem ser preenchidos.");
        setErrorMessage("Erro: Todos os campos devem ser preenchidos.");
        return;
    }

    try {

        const id = uuidToNumber(uuidv4()); 
        const dataAtual = new Date(); 

        const novaCarteira = new Vcarteira(id, nome, moeda, saldo, dataAtual, dataAtual, usuarioId);

        const sucesso = await novaCarteira.adicionarCarteira();

        if (sucesso) {

          console.log("Carteira adicionada com sucesso.");
          setErrorMessage("Carteira adicionada com sucesso.");

            const vcarteiraInstance = new Vcarteira();
            const carteirasAtualizadas = await vcarteiraInstance.listarCarteiras(usuarioId);

            setCarteiras(carteirasAtualizadas.map((carteira) => ({
              id: carteira.getId(),
              nome: carteira.getNome(),
              moeda: carteira.getMoeda(),
              saldo: carteira.getSaldo(),
              data: carteira.getDataCriacao() && !isNaN(carteira.getDataCriacao().getTime())
              ? carteira.getDataCriacao().toISOString()
              : new Date().toISOString(), 
              dataEdicao: carteira.getDataEdicao() && !isNaN(carteira.getDataEdicao().getTime())
              ? carteira.getDataEdicao().toISOString()
              : new Date().toISOString(),
              usuarioId: carteira.getUsuarioId(),
            })));

            setNome("");
            setMoeda("");
            setSaldo(0);
        } else {
            console.error("Erro ao adicionar carteira.");
        }
    } catch (error) {
        console.error("Erro ao adicionar carteira:", error);
    }
  };

  const handleEditarClique = (carteira: any) => {
    setCarteiraEditando(carteira.id);
    setNovoNome(carteira.nome);
    setNovaMoeda(carteira.moeda);
    setNovoSaldo(carteira.saldo);
  };

  const handleSalvarEdicao = async (carteiraId: number) => {
    try {
      const carteira = new Vcarteira();
      const dataEditar = new Date(); 

      console.log("ID: " + carteiraId);
      console.log("IDEstrageiro: " + usuarioId);
      
      const sucesso = await carteira.editarCarteira(carteiraId, novoNome, novaMoeda, novoSaldo, dataEditar);
  
      if (sucesso) {
        setCarteiras(prevCarteiras =>
          prevCarteiras.map(carteira =>
            carteira.id === carteiraId
              ? { 
                  ...carteira, 
                  nome: novoNome, 
                  moeda: novaMoeda, 
                  saldo: novoSaldo, 
                  dataEdicao: dataEditar.toISOString() 
                }
              : carteira
          )
        );
        setCarteiraEditando(null); 
      } else {
        alert("Erro ao editar a carteira. Tente novamente mais tarde.");
      }
    } catch (error) {
      console.error("Erro ao salvar a edição da carteira:", error);
      alert("Ocorreu um erro ao salvar a edição da carteira.");
    }
  };
  
  const removerCarteira = async (idCarteira: number) => {
    try {
      const carteira = new Vcarteira();
      const sucesso = await carteira.excluirCarteira(idCarteira);
  
      if (sucesso) {
        console.log("Carteira removida com sucesso.");
        setErrorMessage("Carteira removida com sucesso.");
        
        setCarteiras(carteirasAtuais =>
          carteirasAtuais.filter(carteira => carteira.id !== idCarteira)
        );
      } else {
        console.error("Erro ao remover a carteira.");
        alert("Erro ao remover a carteira. Tente novamente mais tarde.");
      }
    } catch (error) {
      console.error("Erro ao remover a carteira:", error);
      alert("Ocorreu um erro ao remover a carteira.");
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
                onChange={(e) => {
                  const value = e.target.value;
                  setSaldo(value === '' ? 0 : Number(value));
                }}
                required
              />
            </div>

            {errorMessage && <p className="error-message">{errorMessage}</p>}

            <button type="submit" className="btn btn-dark">Adicionar Carteira</button>

          </form>
        </div>
      </div>

      <div>
        <h3>Carteiras Adicionadas</h3>
        {carteiras.length === 0 ? (
          <p>{mensagemCarteiraVazia}</p>
        ) : (
          <ul className="list-group">
            {carteiras.map((carteira) => (
              <li
                key={carteira.id}
                className="list-group-item d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center mb-2"
              >
                {carteiraEditando === carteira.id ? (

                  <div className="d-flex flex-column flex-md-row w-100 gap-2">
                    <input
                      type="text"
                      value={novoNome}
                      onChange={(e) => setNovoNome(e.target.value)}
                      className="form-control flex-grow-1"
                      placeholder="Nome da Carteira"
                    />
                    <select
                      value={novaMoeda}
                      onChange={(e) => setNovaMoeda(e.target.value)}
                      className="form-select flex-grow-1"
                    >
                      {moedas.map((moeda) => (
                        <option key={moeda} value={moeda}>
                          {moeda}
                        </option>
                      ))}
                    </select>
                    <input
                      type="number"
                      value={novoSaldo}
                      onChange={(e) => {
                        const value = e.target.value;
                        setNovoSaldo(value === '' ? 0 : Number(value) || 0);
                      }}
                      className="form-control flex-grow-1"
                      placeholder="Saldo"
                    />
                    <button
                      className="btn btn-dark"
                      onClick={() => handleSalvarEdicao(carteira.id)}
                    >
                      Salvar
                    </button>
                  </div>
                ) : (

                  <div className="d-flex flex-column flex-md-row w-100 justify-content-between align-items-start align-items-md-center">
                    <div className="d-flex flex-column flex-md-row align-items-start align-items-md-center text-truncate">

                      <div className="d-flex align-items-center">
                        <strong>{carteira.nome}</strong>
                      </div>

                      <div className="d-flex align-items-center ms-md-2 text-muted">
                        <i className="fas fa-coins"></i>
                        <span className="ms-1">{carteira.moeda}</span>
                      </div>
         
                      <div className="d-flex align-items-center ms-md-2 text-primary">
                        <i className="fas fa-money-bill"></i>
                        <span className="ms-1">{carteira.saldo.toFixed(2)}</span>
                      </div>
             
                      <div className="d-flex align-items-center ms-md-2 text-secondary">
                        <i className="fas fa-calendar-alt"></i>
                        <span className="ms-1">
                          {format(new Date(carteira.data), 'dd MMMM yyyy, HH:mm:ss')}
                        </span>
                      </div>

                      <div className="d-flex align-items-center ms-md-2 text-secondary">
                        <i className="fas fa-calendar-alt"></i>
                        <span>
                          {format(new Date(carteira.dataEdicao), 'dd MMMM yyyy, HH:mm:ss')}
                        </span>
                      </div>
                    </div>
       
                    <div className="d-flex flex-wrap justify-content-end mt-2 mt-md-0 gap-2">
                      <button
                        className="btn btn-dark btn-sm"
                        onClick={() => handleEditarClique(carteira)}
                      >
                        Editar
                      </button>
                      <button
                        className="btn btn-secondary btn-sm"
                        onClick={() => removerCarteira(carteira.id)}
                      >
                        Remover
                      </button>
                    </div>
                  </div>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>

    </div>
  );
};

export default Carteira;