
class FonteDeRenda {
    id: number;
    nome: string;
    valor: number;
    data: Date;
    categoria: string;
    usuarioId: number; 
    constructor(id: number, nome: string, valor: number, data: Date, categoria: string, usuarioId: number) {
        this.id = id;
        this.nome = nome;
        this.valor = valor;
        this.data = data;
        this.categoria = categoria;
        this.usuarioId = usuarioId;
    }

    adicionar(): boolean {
        console.log("Adicionar fonte de renda");
        return true;
    }

    remover(): boolean {
        console.log("Remover fonte de renda");
        return true;
    }

    editar(): boolean {
        console.log("Editar fonte de renda");
        return true;
    }

    listar(): FonteDeRenda[] {
        console.log("Listar fontes de renda");
        return [];
    }
}

export default FonteDeRenda;
