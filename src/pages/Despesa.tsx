import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Vdespesa from '../classes/Despesa.ts';
import Vcarteira from '../classes/Carteira.ts';
import { v4 as uuidv4 } from 'uuid';

interface IDespesa {
  id: number;
  descricao: string;
  categoria: string;
  valor: string;
  date: string;
  carteiraId: number; 
  usuarioId: number;
}

interface Carteira {
  id: number;
  nome: string;
  moeda: string;
  saldo: number;
  data: string;
  dataEdicao: string;
  usuarioId: number;
}

const categorias = [
  'Alimentação',
  'Transporte',
  'Saúde',
  'Educação',
  'Lazer',
  'Outras',
];

const Despesa: React.FC = () => {
  const [carteiras, setCarteiras] = useState<Carteira[]>([]);
  const [despesas, setDespesas] = useState<IDespesa[]>([]);
  const [descricao, setDescricao] = useState('');
  const [valor, setValor] = useState<number>(0);
  const [categoria, setCategoria] = useState(categorias[0]);
  const [usuarioId, setUsuarioId] = useState<number | null>(null);
  const [carteiraId, setCarteiraId] = useState<number | null>(null);  // id 
  const [errorMessage, setErrorMessage] = useState('');
  const [mensagemDespesaVazia, setMensagemDespesaVazia] = useState("");
  const [mensagemCarteiraVazia, setMensagemCarteiraVazia] = useState("");
  const [despesaEditando, setDespesaEditando] = useState(null);
  const [novaCarteira, setNovoCarteira] = useState('');
  const [novoDescricao, setNovoDescricao] = useState('');
  const [novaValor, setNovaValor] = useState<number>(0);
  const [novoCategoria, setNovoCategoria] = useState('');
  const [nomeCarteira, setNomeCarteira] =useState('');

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

  const obterNomeCarteira = (carteiraId?: number): string => {
    if (carteiraId === undefined || carteiraId === null) {
      return "ID da carteira inválido";
    }
    const carteira = carteiras.find((carteira) => carteira.id === carteiraId);
    return carteira ? carteira.nome : "Carteira Não Encontrada";
  };

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

  useEffect(() => {
    const carregarDespesas = async () => {
        if (usuarioId !== null && usuarioId !== undefined) {  
            try {
                const vdespesaInstance = new Vdespesa();
                const despesaAtualizadas = await vdespesaInstance.listarDespesa(usuarioId);

                if (despesaAtualizadas.length === 0) {
                    setMensagemDespesaVazia("Você ainda não possui Despesa.");
                } else {
                    setMensagemDespesaVazia(""); 
                }

                setDespesas(
                  despesaAtualizadas.map((despesa) => ({
                    id: despesa.getId(),
                    descricao: despesa.getDescricao(),
                    valor: despesa.getValor().toString(), 
                    categoria: despesa.getDespensa(),
                    data: despesa.getData() instanceof Date && !isNaN(despesa.getData().getTime())
                    ? despesa.getData().toISOString()
                    : new Date().toISOString(),
                    dataEdicao: despesa.getDataEditar() &&
                      !isNaN(new Date(despesa.getDataEditar()).getTime())
                      ? new Date(despesa.getDataEditar()).toISOString()
                      : new Date().toISOString(),
                    carteiraId: despesa.getCarteiraId(),
                    date: despesa.getData() && !isNaN(despesa.getData().getTime())
                      ? despesa.getData().toISOString()
                      : new Date().toISOString(),
                    usuarioId: despesa.getUsuarioId(),
                  }))
                );

            } catch (error) {
                console.error("Erro ao listar carteiras:", error);
                setMensagemDespesaVazia("Erro ao carregar Despesa.");
            }
        } else {
            console.warn("usuarioId está indefinido ou é nulo");
        }
    };

    carregarDespesas();
  }, [usuarioId]);
  
  const adicionarDespesa = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
        const id = uuidToNumber(uuidv4()); 
        const dataAtual = new Date(); 

        console.log(`ID da carteira: ${carteiraId}`);

        const novaRenda = new Vdespesa(id, descricao, categoria, valor, dataAtual, dataAtual, carteiraId ?? undefined, usuarioId ?? undefined);

        const sucesso = await novaRenda.adicionarDespesa();

        if (sucesso) {
            console.log("Despesa adicionada com sucesso.");
            setErrorMessage("Despesa adicionada com sucesso.");

            const despesaInstance = new Vdespesa();
            console.log(`UsuarioId: ${usuarioId}`);
            const despensasAtualizadas = await despesaInstance.listarDespesa(usuarioId || 0);

            if (despensasAtualizadas.length === 0) {
                setMensagemDespesaVazia("Você ainda não possui despesas.");
            } else {
                setMensagemDespesaVazia("");
            }

            setDespesas(
              despensasAtualizadas.map((despesa) => ({
                id: despesa.getId(),
                descricao: despesa.getDescricao(),
                valor: despesa.getValor().toString(), 
                categoria: despesa.getDespensa(),
                data: despesa.getData() instanceof Date && !isNaN(despesa.getData().getTime())
                ? despesa.getData().toISOString()
                : new Date().toISOString(),
                dataEdicao: despesa.getDataEditar() &&
                  !isNaN(new Date(despesa.getDataEditar()).getTime())
                  ? new Date(despesa.getDataEditar()).toISOString()
                  : new Date().toISOString(),
                carteiraId: despesa.getCarteiraId(),
                date: despesa.getData() && !isNaN(despesa.getData().getTime())
                  ? despesa.getData().toISOString()
                  : new Date().toISOString(),
                usuarioId: despesa.getUsuarioId(),
              }))
            );

            setDescricao("");
            setValor(0);
            setCategoria('');

            const carregarCarteiras = async () => {
              try {
                const respostaCarteiras = await fetch("url-para-obter-carteiras");
                const carteirasObtidas = await respostaCarteiras.json();
                setCarteiras(carteirasObtidas);
              } catch (error) {
                console.error("Erro ao carregar as carteiras:", error);
              }
            };

            carregarCarteiras();

        } else {
            console.error("Erro ao adicionar despesa.");
        }
    } catch (error) {
        console.error("Erro ao adicionar despesa:", error);
    }
  };

  const handleEditarClique = (despesa: any) => {
    setDespesaEditando(despesa.id);
    setNovoDescricao(despesa.descricao);
    setNovaValor(despesa.valor);
    setNovoCategoria(despesa.categoria);
    setNovoCarteira(despesa.carteiraId);
  
    const nomeCarteira = obterNomeCarteira(despesa.carteiraId);
    setNomeCarteira(nomeCarteira);
  };
  
    const handleSalvarEdicao = async (despesaId: number) => {
      try {
        const despesa = new Vdespesa();
        const dataEditar = new Date(); 
  
        console.log("ID: " + despesaId);
        console.log("IDEstrageiro: " + usuarioId);
        
        console.log(`CarteiraId Editar: ${novaCarteira}`);
        const sucesso = await despesa.editarDespesa(despesaId, novoDescricao, novoCategoria, novaValor, dataEditar, Number(novaCarteira));
    
        if (sucesso) {
          setDespesas(prevDespesas =>
            prevDespesas.map(despesa =>
              despesa.id === despesaId
                ? {
                    ...despesa,
                    descricao: novoDescricao,
                    categoria: novoCategoria,
                    valor: novaValor.toString(), 
                    carteiraId:!isNaN(Number(novaCarteira))
                    ? Number(novaCarteira)
                    : despesa.carteiraId ?? despesa.carteiraId,

                  }
                : despesa
            )
          );
          setDespesaEditando(null);
        } else {
          alert("Erro ao editar a despesa. Tente novamente mais tarde.");
        }
      } catch (error) {
        console.error("Erro ao salvar a edição da renda:", error);
        alert("Ocorreu um erro ao salvar a edição da Despesa.");
      }
    };
    
    const removerDespesa = async (idDespensa: number) => {
      try {
        const despesa = new Vdespesa();
        const sucesso = await despesa.excluirDespesa(idDespensa);
    
        if (sucesso) {
          console.log("Despesa removida com sucesso.");
          setErrorMessage("Despesa removida com sucesso.");
          
          setDespesas(despesasAtuais =>
            despesasAtuais.filter(despesa => despesa.id !== idDespensa)
          );
        } else {
          console.error("Erro ao remover a Despesa.");
          alert("Erro ao remover a Despesa. Tente novamente mais tarde.");
        }
      } catch (error) {
        console.error("Erro ao remover a Despesa:", error);
        alert("Ocorreu um erro ao remover a Despesa.");
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
              <label htmlFor="carteira" className="form-label">Carteira:</label>
              <select
                id="carteira"
                className="form-select"
                value={carteiraId || ''}  
                onChange={(e) => {
                  const selectedId = e.target.value;  
                  console.log("ID da carteira selecionada:", selectedId);  

                  
                  setCarteiraId(Number(selectedId));
                }}
              >
                {/* Opção para "Selecionar carteira" */}
                <option value="" disabled={carteiras.length > 0}>Selecionar carteira</option>

                {carteiras.length === 0 ? (
                  <option disabled>{mensagemCarteiraVazia}</option>
                ) : (
                  carteiras.map((carteira) => (
                    <option key={carteira.id.toString()} value={carteira.id}>
                      {carteira.nome}
                    </option>
                  ))
                )}
              </select>
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
              <div className="mb-3">
                <label htmlFor="valor" className="form-label">Valor:</label>
                <input
                  type="number"
                  id="valor"
                  className="form-control"
                  value={valor || 0} 
                  onChange={(e) => setValor(Number(e.target.value) || 0)} 
                  required
                />
              </div>

              {errorMessage && <p className="error-message">{errorMessage}</p>}

              <button type="submit" className="btn btn-dark">Adicionar Despesa</button>
          
          </form>
        </div>
      </div>
              
      <div>
        <h3>Despesas Adicionadas</h3>
        {despesas.length === 0 ? (
          <p>{mensagemDespesaVazia}</p>
        ) : (
          <ul className="list-group">
            {despesas.map((despesa) => (
              <li
                key={despesa.id.toString()} 
                className="list-group-item d-flex flex-column flex-md-row justify-content-between align-items-center mb-2"
              >
                {despesaEditando === despesa.id ? (
                  <div className="d-flex flex-column flex-md-row w-100">
                    <input
                      type="text"
                      value={novoDescricao}
                      onChange={(e) => setNovoDescricao(e.target.value)}
                      className="form-control me-2 mb-2 mb-md-0"
                    />
                    <select
                      value={novoCategoria}
                      onChange={(e) => setNovoCategoria(e.target.value)}
                      className="form-select me-2 mb-2 mb-md-0"
                      aria-label="Selecione a categoria"
                    >
                      {categorias.map((cat) => (
                        <option key={cat} value={cat}>
                          {cat}
                        </option>
                      ))}
                    </select>
                    <select
                      value={novaCarteira}
                      onChange={(e) => setNovoCarteira(e.target.value)}
                      className="form-select me-2 mb-2 mb-md-0"
                    >
                      {carteiras.map((cat) => (
                        <option key={cat.id} value={cat.id}>
                          {cat.nome}
                        </option>
                      ))}
                    </select>
                    <input
                      type="number"
                      value={novaValor}
                      onChange={(e) => {
                        const value = e.target.value;
                        setNovaValor(value === '' ? 0 : Number(value) || 0);
                      }}
                      className="form-control me-2 mb-2 mb-md-0"
                    />
                    <button
                      className="btn btn-dark"
                      onClick={() => handleSalvarEdicao(despesa.id)}
                    >
                      Salvar
                    </button>
                  </div>
                ) : (
                  <div className="d-flex flex-column flex-md-row w-100 justify-content-between align-items-center">
                    <div className="d-flex flex-column flex-md-row align-items-center w-100 text-truncate">
                      <div className="d-flex align-items-center">
                        <strong>{despesa.descricao}</strong>
                      </div>

                      <div className="d-flex align-items-center ms-2 text-muted">
                        <i className="fas fa-coins"></i>
                        <span className="ms-1">
                          {despesa.categoria}
                        </span>
                      </div>

                      <div className="d-flex align-items-center ms-2 text-primary">
                        <i className="fas fa-dollar-sign"></i>
                        <span className="ms-1">
                          R$
                          {(() => {
                            const numericValue = typeof despesa.valor === 'number'
                              ? despesa.valor
                              : parseFloat(despesa.valor as string);
                            return !isNaN(numericValue) ? numericValue.toFixed(2) : '0.00';
                          })()}
                        </span>
                      </div>

                      <div key={despesa.id} className="d-flex align-items-center ms-2 text-secondary">
                        <i className="fas fa-coins"></i>
                        <span className="ms-1">
                        {obterNomeCarteira(despesa.carteiraId || Number(nomeCarteira))}
                        </span>
                      </div>

                    </div>

                    <div className="d-flex flex-wrap justify-content-end mt-2 mt-md-0 w-100">
                      <button
                        className="btn btn-dark btn-sm me-2 mb-2 mb-md-0"
                        onClick={() => handleEditarClique(despesa)}
                      >
                        Editar
                      </button>
                      <button
                        className="btn btn-secondary btn-sm mb-2 mb-md-0"
                        onClick={() => removerDespesa(despesa.id)}
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

export default Despesa;