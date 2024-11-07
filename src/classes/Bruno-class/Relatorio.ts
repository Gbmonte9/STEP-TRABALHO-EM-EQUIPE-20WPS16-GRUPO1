import Usuario from "./Usuario";
import Despesa from "./Despesa";
import Renda from "./Renda";

class Relatorio {
    private id: number;
    private periodo: string;
    private totalReceitas: number; 
    private totalDespesas: number; 
    private saldo: number;
    private usuarioId: Usuario; 
  
    constructor(id: number, periodo: string, usuarioId: Usuario, totalReceitas: number = 0, totalDespesas: number = 0) {
        this.id = id;
        this.periodo = periodo;
        this.usuarioId = usuarioId;
        this.totalReceitas = totalReceitas; 
        this.totalDespesas = totalDespesas;
        this.saldo = totalReceitas - totalDespesas; 
    }
  
    gerarRelatorio(): void {
        this.saldo = this.totalReceitas - this.totalDespesas;
    }
  
    setPeriodo(novoPeriodo: string): void {
        this.periodo = novoPeriodo;
    }
  
    setTotalReceitas(novoValor: number): void {
        this.totalReceitas = novoValor;
        this.gerarRelatorio(); 
    }
  
    setTotalDespesas(novoValor: number): void {
        this.totalDespesas = novoValor;
        this.gerarRelatorio(); 
    }
  
    exibirRelatorio(): void {
        console.log(`Relatório de ${this.periodo}:`);
        console.log(`Total de Receitas: ${this.totalReceitas}`);
        console.log(`Total de Despesas: ${this.totalDespesas}`);
        console.log(`Saldo: ${this.saldo}`);
    }

    getId(): number {
        return this.id;
    }

    getUsuarioId(): Usuario {
        return this.usuarioId;
    }

    setUsuarioId(novoUsuarioId: Usuario): void {
        this.usuarioId = novoUsuarioId;
    }
}

export default Relatorio;