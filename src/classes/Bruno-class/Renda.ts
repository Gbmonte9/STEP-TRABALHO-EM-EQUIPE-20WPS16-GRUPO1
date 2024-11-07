import Usuario from './Usuario.ts';

class Renda {
    
    private id: number; 
    private nome: string; 
    private valor: number;
    private categoria: string; 
    private usuario: Usuario; 
    
    constructor(id: number, nome: string, valor: number, categoria: string, usuario: Usuario) {
        this.id = id;
        this.nome = nome;
        this.valor = valor;
        this.categoria = categoria;
        this.usuario = usuario;
    }

    getId(): number {
        return this.id;
    }

    getNome(): string {
        return this.nome;
    }

    getValor(): number {
        return this.valor;
    }

    getCategoria(): string {
        return this.categoria;
    }

    getUsuario(): Usuario {
        return this.usuario;
    }

    setNome(novoNome: string): void {
        this.nome = novoNome;
    }

    setValor(novoValor: number): void {
        this.valor = novoValor;
    }

    setCategoria(novaCategoria: string): void {
        this.categoria = novaCategoria;
    }

    setUsuario(novoUsuario: Usuario): void {
        this.usuario = novoUsuario;
    }

    adicionarFonteRenda(): void {
        console.log('Fonte de renda adicionada');
    }

    removerFonteRenda(): void {
        console.log('Fonte de renda removida');
    }

    editarFonteRenda(novoNome: string, novoValor: number, novaCategoria: string): void {
        this.nome = novoNome;
        this.valor = novoValor;
        this.categoria = novaCategoria;
        console.log('Fonte de renda editada');
    }

    listarFonteRenda(): void {
        console.log('Listando fontes de renda');
    }

}

export default Renda;
