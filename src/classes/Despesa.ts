import Carteira from "../classes/Carteira";  

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

    setId(id: number): void {
        this.id = id;
    }

    getDescricao(): string {
        return this.descricao;
    }

    setDescricao(descricao: string): void {
        this.descricao = descricao;
    }

    getValor(): number {
        return this.valor;
    }

    setValor(valor: number): void {
        this.valor = valor;
    }

    getData(): Date {
        return this.data;
    }

    setData(data: Date): void {
        this.data = data;
    }

    getCategoria(): string {
        return this.categoria;
    }

    setCategoria(categoria: string): void {
        this.categoria = categoria;
    }

    getCarteira(): Carteira {
        return this.carteira;
    }

    setCarteira(carteira: Carteira): void {
        this.carteira = carteira;
    }

    adicionarDespesa(): boolean {
        console.log("Despesa adicionada");
        return true;
    }

    removerDespesa(): boolean {
        console.log("Despesa removida");
        return true;
    }

    editarDespesa(descricao: string, valor: number, categoria: string): boolean {
        this.descricao = descricao;
        this.valor = valor;
        this.categoria = categoria;
        console.log("Despesa editada");
        return true;
    }

    localizarDespesa(id: number): boolean {
        console.log(`Localizando despesa com ID: ${id}`);
        return true;  
    }

    listarDespesas(): Despesa[] {
        console.log("Listando despesas");
        return [this];  
    }
}

export default Despesa;