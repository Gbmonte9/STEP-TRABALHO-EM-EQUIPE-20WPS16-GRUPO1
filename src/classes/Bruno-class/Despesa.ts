import Carteira from './Carteira';

class Despesa {

    private id: number;
    private descricao: string;
    private valor: number;
    private data: Date;
    private categoria: string;
    private carteira: Carteira; 
  
    constructor(id: number, descricao: string, valor: number, data: Date, categoria: string, carteira: Carteira) {
        this.id = id;
        this.descricao = descricao;
        this.valor = valor;
        this.data = data;
        this.categoria = categoria;
        this.carteira = carteira;
    }

    getId(): number {
        return this.id;
    }

    getDescricao(): string {
        return this.descricao;
    }

    getValor(): number {
        return this.valor;
    }

    getData(): Date {
        return this.data;
    }

    getCategoria(): string {
        return this.categoria;
    }

    getCarteira(): Carteira {
        return this.carteira;
    }

    setDescricao(novaDescricao: string): void {
        this.descricao = novaDescricao;
    }

    setValor(novoValor: number): void {
        this.valor = novoValor;
    }

    setData(novaData: Date): void {
        this.data = novaData;
    }

    setCategoria(novaCategoria: string): void {
        this.categoria = novaCategoria;
    }

    setCarteira(novaCarteira: Carteira): void {
        this.carteira = novaCarteira;
    }

    adicionarDespesa(): void {
        console.log('Despesa adicionada');
    }

    excluirDespesa(): void {
        console.log('Despesa excluída');
    }

    editarDespesa(novaDescricao: string, novoValor: number, novaData: Date, novaCategoria: string): void {
        this.descricao = novaDescricao;
        this.valor = novoValor;
        this.data = novaData;
        this.categoria = novaCategoria;
        console.log('Despesa editada');
    }

    listarDespesas(): void {
        console.log('Listando despesas');
    }

}

export default Despesa;