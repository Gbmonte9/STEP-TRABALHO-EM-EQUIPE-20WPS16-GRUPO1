import Usuario from './Usuario.ts';

class Carteira {

    private id: number;
    private nome: string;
    private moeda: string;
    private saldo: number;
    private dataCriacao: Date;
    private usuario: Usuario; 
  
    constructor(id: number, nome: string, moeda: string, saldo: number, usuario: Usuario) {
      this.id = id;
      this.nome = nome;
      this.moeda = moeda;
      this.saldo = saldo;
      this.dataCriacao = new Date();
      this.usuario = usuario; 
    }

    getId(): number {
        return this.id;
    }

    getNome(): string {
        return this.nome;
    }

    getMoeda(): string {
        return this.moeda;
    }

    getSaldo(): number {
        return this.saldo;
    }

    getDataCriacao(): Date {
        return this.dataCriacao;
    }

    getUsuario(): Usuario {
        return this.usuario;
    }

    setNome(novoNome: string): void {
        this.nome = novoNome;
    }

    setMoeda(novaMoeda: string): void {
        this.moeda = novaMoeda;
    }

    setSaldo(novoSaldo: number): void {
        this.saldo = novoSaldo;
    }

    setUsuario(novoUsuario: Usuario): void {
        this.usuario = novoUsuario;
    }

    adicionar(): void {
      console.log('Carteira adicionada');
    }
  
    remover(): void {
      console.log('Carteira removida');
    }
  
    editar(novoNome: string, novaMoeda: string): void {
      this.nome = novoNome;
      this.moeda = novaMoeda;
      console.log('Carteira editada');
    }
  
    atualizarSaldo(valor: number): void {
      this.saldo += valor;
      console.log('Saldo atualizado');
    }
  
  }
  
  export default Carteira;