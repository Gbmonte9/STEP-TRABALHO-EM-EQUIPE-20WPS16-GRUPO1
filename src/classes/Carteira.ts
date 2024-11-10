import Usuario from "./Usuario.ts";  

class Carteira {
    private id: number;
    private nome: string;
    private moeda: string;
    private saldo: number;
    private dataCriacao: Date;
    private dataEdicao: Date;
    private usuarioId: Usuario;  

    constructor(id: number, nome: string, moeda: string, saldo: number, dataCriacao: Date, usuario: Usuario) {
        this.id = id;
        this.nome = nome;
        this.moeda = moeda;
        this.saldo = saldo;
        this.dataCriacao = dataCriacao;
        this.dataEdicao = new Date();  
        this.usuarioId = usuario;    
    }

    getId(): number {
        return this.id;
    }

    setId(id: number): void {
        this.id = id;
    }

    getNome(): string {
        return this.nome;
    }

    setNome(nome: string): void {
        this.nome = nome;
        this.dataEdicao = new Date();  
    }

    getMoeda(): string {
        return this.moeda;
    }

    setMoeda(moeda: string): void {
        this.moeda = moeda;
        this.dataEdicao = new Date();  
    }

    getSaldo(): number {
        return this.saldo;
    }

    setSaldo(saldo: number): void {
        this.saldo = saldo;
        this.dataEdicao = new Date();  
    }

    getDataCriacao(): Date {
        return this.dataCriacao;
    }

    getDataEdicao(): Date {
        return this.dataEdicao;
    }

    getUsuario(): Usuario {
        return this.usuarioId;
    }

    setUsuario(usuario: Usuario): void {
        this.usuarioId = usuario;
    }

    adicionarTransacao(): boolean {
        console.log("Transação adicionada com sucesso.");
        return true;
    }

    removerCarteira(): boolean {
        console.log("Carteira removida com sucesso.");
        return true;
    }

    editarCarteira(nome: string, moeda: string, saldo: number): boolean {
        this.setNome(nome);
        this.setMoeda(moeda);
        this.setSaldo(saldo);
        console.log("Carteira editada com sucesso.");
        return true;
    }

    atualizarSaldoCarteira(saldo: number): boolean {
        this.setSaldo(saldo);
        console.log("Saldo da carteira atualizado com sucesso.");
        return true;
    }

    localizarCarteira(): Carteira[] {
        console.log("Localizando carteiras...");
        return [this];
    }

    listarCarteira(): Carteira[] {
        console.log("Listando todas as carteiras...");
        return [this];
    }
}

export default Carteira;