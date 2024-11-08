// Despesa.ts

class Despesa {
    id: number;
    descricao: string;
    valor: number;
    data: Date;
    categoria: string;
    carteiraId: number;

    constructor(id: number, descricao: string, valor: number, data: Date, categoria: string, carteiraId: number) {
        this.id = id;
        this.descricao = descricao;
        this.valor = valor;
        this.data = data;
        this.categoria = categoria;
        this.carteiraId = carteiraId;
    }

    adicionar(): boolean {
        console.log("Adicionar despesa");
        return true;
    }

    remover(): boolean {
        console.log("Remover despesa");
        return true;
    }

    editar(): boolean {
        console.log("Editar despesa");
        return true;
    }

    listar(): Despesa[] {
        console.log("Listar despesas");
        return [];
    }
}

export default Despesa;
