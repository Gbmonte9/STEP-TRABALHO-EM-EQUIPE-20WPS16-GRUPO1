import Usuario from "./Usuario"; 

class FonteDeRenda {
    private id: number;
    private nome: string;
    private valor: number;
    private data: Date;
    private categoria: string;
    private usuario: Usuario; 

    constructor(id: number, nome: string, valor: number, data: Date, categoria: string, usuario: Usuario) {
        this.id = id;
        this.nome = nome;
        this.valor = valor;
        this.data = data;
        this.categoria = categoria;
        this.usuario = usuario;  
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

    getUsuario(): Usuario {
        return this.usuario;
    }

    setUsuario(usuario: Usuario): void {
        this.usuario = usuario;
    }

    adicionarRenda(): boolean {
        console.log("Fonte de renda adicionada");
        return true;
    }

    removerRenda(): boolean {
        console.log("Fonte de renda removida");
        return true;
    }

    editarRenda(nome: string, valor: number, categoria: string): boolean {
        this.nome = nome;
        this.valor = valor;
        this.categoria = categoria;
        console.log("Fonte de renda editada");
        return true;
    }

    localizarRenda(id: number): boolean {
        console.log(`Localizando fonte de renda com ID: ${id}`);
        return true;  
    }

    listarRenda(): FonteDeRenda[] {
        console.log("Listando fontes de renda");
        return [this];  
    }
}

export default FonteDeRenda;