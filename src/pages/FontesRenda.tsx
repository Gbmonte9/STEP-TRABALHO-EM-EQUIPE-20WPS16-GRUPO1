import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Renda from '../classes/FonteDeRenda.ts';
import { v4 as uuidv4 } from 'uuid';
import { format } from 'date-fns';

interface FonteRenda {
  id: number;
  nome: string;
  valor: number;
  data: string;
  dataEdicao: string,
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
  const [categoria, setCategoria] = useState(categorias[0]);
  const [usuarioId, setUsuarioId] = useState<number | null>(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [mensagemRendaVazia, setMensagemRendaVazia] = useState("");
  const [rendaEditando, setRendaEditando] = useState(null);
  const [novoNome, setNovoNome] = useState('');
  const [novoCategoria, setNovoCategoria] = useState('');
  const [novaValor, setNovaValor] = useState<number>(0); 
  
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
    const carregarRendas = async () => {
        if (usuarioId !== null && usuarioId !== undefined) {  
            try {
                const rendaInstance = new Renda();
                const rendasAtualizadas = await rendaInstance.listarRenda(usuarioId);

                if (rendasAtualizadas.length === 0) {
                    setMensagemRendaVazia("Você ainda não possui carteiras.");
                } else {
                    setMensagemRendaVazia(""); 
                }

                setFontes(rendasAtualizadas.map((renda) => ({
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

            } catch (error) {
                console.error("Erro ao listar carteiras:", error);
                setMensagemRendaVazia("Erro ao carregar carteiras.");
            }
        } else {
            console.warn("usuarioId está indefinido ou é nulo");
        }
    };

    carregarRendas();
  }, [usuarioId]);


  const adicionarFonte = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if(!usuarioId) {
      console.error("Erro: ID de usuário não encontrado.");
      setErrorMessage("Erro: ID de usuário não encontrado.");
      return;
    }

    if(!nome || !valor || categoria === undefined) {
      console.error("Erro: Todos os campos devem ser preenchidos.");
      setErrorMessage("Erro: Todos os campos devem ser preenchidos.");
      return;
    }

      try {

          const id = uuidToNumber(uuidv4()); 
          const dataAtual = new Date(); 

          const novaRenda = new Renda(id, nome, valor, categoria, dataAtual, dataAtual, usuarioId);

          const sucesso = await novaRenda.adicionarRenda();

          if (sucesso) {

            console.log("Fonte adicionada com sucesso.");
            setErrorMessage("Fonte adicionada com sucesso.");

              const rendaInstance = new Renda();
              const rendasAtualizadas = await rendaInstance.listarRenda(usuarioId);

              setFontes(rendasAtualizadas.map((renda) => ({
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

              setNome("");
              setValor("");
              setCategoria('');

          } else {
              console.error("Erro ao adicionar renda.");
          }
      } catch (error) {
          console.error("Erro ao adicionar renda:", error);
      }

  };

  const handleEditarClique = (fonte: any) => {
    setRendaEditando(fonte.id);
    setNovoNome(fonte.nome);
    setNovaValor(fonte.valor);
    setNovoCategoria(fonte.categoria);
  };

  const handleSalvarEdicao = async (rendaId: number) => {
    try {
      const renda = new Renda();
      const dataEditar = new Date(); 

      console.log("ID: " + rendaId);
      console.log("IDEstrageiro: " + usuarioId);
      
      const sucesso = await renda.editarRenda(rendaId, novoNome, novoCategoria, novaValor, dataEditar);
  
      if (sucesso) {
        setFontes(prevRendas =>
          prevRendas.map(renda =>
            renda.id === rendaId
              ? { ...renda, nome: novoNome, categoria: novoCategoria, valor: novaValor, dataEdicao: dataEditar.toISOString() }
              : renda
          )
        );
        setRendaEditando(null); 
      } else {
        alert("Erro ao editar a renda. Tente novamente mais tarde.");
      }
    } catch (error) {
      console.error("Erro ao salvar a edição da renda:", error);
      alert("Ocorreu um erro ao salvar a edição da renda.");
    }
  };
  
  const removerFonte = async (idFonte: number) => {
    try {
      const fonte = new Renda();
      const sucesso = await fonte.excluirFonte(idFonte);
  
      if (sucesso) {
        console.log("Carteira removida com sucesso.");
        setErrorMessage("Carteira removida com sucesso.");
        
        setFontes(fontesAtuais =>
          fontesAtuais.filter(fonte => fonte.id !== idFonte)
        );
      } else {
        console.error("Erro ao remover a carteira.");
        alert("Erro ao remover a fonte. Tente novamente mais tarde.");
      }
    } catch (error) {
      console.error("Erro ao remover a carteira:", error);
      alert("Ocorreu um erro ao remover a fonte.");
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
                value={valor}
                onChange={(e) => setValor(e.target.value === '' ? '' : Number(e.target.value))}
                required
              />
            </div>

            {errorMessage && <p className="error-message">{errorMessage}</p>}

            <button type="submit" className="btn btn-dark">Adicionar Fonte</button>
          
          </form>
        </div>
      </div>

      <div>
        <h3>Fontes de Renda Adicionadas</h3>
        {fontes.length === 0 ? (
          <p>{mensagemRendaVazia}</p>
        ) : (
          <ul className="list-group">
            {fontes.map((fonte) => (
              <li
                key={fonte.id}
                className="list-group-item d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center mb-2"
              >
                {rendaEditando === fonte.id ? (
                 
                  <div className="d-flex flex-column flex-md-row w-100 gap-2">
                    <input
                      type="text"
                      value={novoNome}
                      onChange={(e) => setNovoNome(e.target.value)}
                      className="form-control flex-grow-1"
                      placeholder="Nome da Fonte"
                    />
                    <select
                      value={novoCategoria}
                      onChange={(e) => setNovoCategoria(e.target.value)}
                      className="form-select flex-grow-1"
                    >
                      {categorias.map((cat) => (
                        <option key={cat} value={cat}>
                          {cat}
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
                      className="form-control flex-grow-1"
                      placeholder="Valor"
                    />
                    <button
                      className="btn btn-dark"
                      onClick={() => handleSalvarEdicao(fonte.id)}
                    >
                      Salvar
                    </button>
                  </div>
                ) : (
                  
                  <div className="d-flex flex-column flex-md-row w-100 justify-content-between align-items-start align-items-md-center">
                    <div className="d-flex flex-column flex-md-row align-items-start align-items-md-center text-truncate">
                     
                      <div className="d-flex align-items-center">
                        <strong>{fonte.nome}</strong>
                      </div>
                     
                      <div className="d-flex align-items-center ms-md-2 text-muted">
                        <i className="fas fa-coins"></i>
                        <span className="ms-1">{fonte.categoria}</span>
                      </div>
                   
                      <div className="d-flex align-items-center ms-md-2 text-primary">
                        <i className="fas fa-dollar-sign"></i>
                        <span className="ms-1">R${fonte.valor.toFixed(2)}</span>
                      </div>
                 
                      <div className="d-flex align-items-center ms-md-2 text-secondary">
                        <i className="fas fa-calendar-alt"></i>
                        <span className="ms-1">
                          {format(new Date(fonte.data), 'dd MMMM yyyy, HH:mm:ss')}
                        </span>
                      </div>
             
                      <div className="d-flex align-items-center ms-md-2 text-secondary">
                        <i className="fas fa-calendar-alt"></i>
                        <span>
                          {format(new Date(fonte.dataEdicao), 'dd MMMM yyyy, HH:mm:ss')}
                        </span>
                      </div>
                    </div>
                
                    <div className="d-flex flex-wrap justify-content-end mt-2 mt-md-0 gap-2">
                      <button
                        className="btn btn-dark btn-sm"
                        onClick={() => handleEditarClique(fonte)}
                      >
                        Editar
                      </button>
                      <button
                        className="btn btn-secondary btn-sm"
                        onClick={() => removerFonte(fonte.id)}
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

export default FontesRenda;