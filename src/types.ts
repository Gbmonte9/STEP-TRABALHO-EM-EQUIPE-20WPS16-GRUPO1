export interface Carteira {
    id: number;
    nome: string;
    moeda: string;
    saldo: number;
    data: string;
    usuarioId: number;
  }
  
  export interface Despesa {
    id: number;
    descricao: string;
    valor: number;
    data: string;
    categoria: string;
    carteiraId: number;
  }
  
  export interface FonteRenda {
    id: number;
    nome: string;
    valor: number;
    data: string;
    categoria: string;
    usuarioId: number;
  }