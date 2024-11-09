
class Carteira {
    id: number;
    nome: string;
    moeda: string;
    saldo: number;
    dataCriacao: Date;
    usuarioId: number; 

    constructor(id: number, nome: string, moeda: string, saldo: number, dataCriacao: Date, usuarioId: number) {
        this.id = id;
        this.nome = nome;
        this.moeda = moeda;
        this.saldo = saldo;
        this.dataCriacao = dataCriacao;
        this.usuarioId = usuarioId;
    }

    adicionar(): boolean {
        console.log("Adicionar transação");
        return true;  
    }

    remover(): boolean {
        console.log("Remover transação");
        return true;  
    }

    editar(): boolean {
        console.log("Editar carteira");
        return true; 
    }

    atualizarSaldo(): boolean {
        console.log("Atualizar saldo");
        return true;  
    }

    listarTransacoes(): Transacao[] {
        console.log("Listar transações");
        return [];  
    }
}

class Transacao {
}

export default Carteira;
