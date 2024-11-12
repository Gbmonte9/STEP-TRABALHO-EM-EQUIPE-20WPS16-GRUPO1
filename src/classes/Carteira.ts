import Usuario from "./Usuario.ts";  

class Carteira {

    private id: number;
    private nome: string;
    private moeda: string;
    private saldo: number;
    private dataCriacao: Date;
    private dataEdicao: Date;
    private usuarioId: number;

    constructor(id: number = 0, nome: string = '', moeda: string = '', saldo: number = 0, dataCriacao: Date = new Date(), dataEdicao: Date = new Date(), usuarioId: number = 0){
        this.id = id;
        this.nome = nome;
        this.moeda = moeda;
        this.saldo = saldo;
        this.dataCriacao = dataCriacao;
        this.dataEdicao = dataEdicao;
        this.usuarioId = usuarioId;
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

    getDataEdicao(): Date {
        return this.dataEdicao;
    }

    getUsuarioId(): number {
        return this.usuarioId;
    }

    setNome(nome: string) {
        this.nome = nome;
    }

    setMoeda(moeda: string) {
        this.moeda = moeda;
    }

    setSaldo(saldo: number) {
        this.saldo = saldo;
    }

    setDataEdicao(data: Date) {
        this.dataEdicao = data;
    }

    setUsuarioId(usuarioId: number) {
        this.usuarioId = usuarioId;
    }

    public async adicionarCarteira(): Promise<boolean> {
        try {
            const response = await fetch("http://localhost:5000/carteira", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    id: this.getId(),
                    nome: this.getNome(),
                    moeda: this.getMoeda(),
                    saldo: this.getSaldo(),
                    dataCriacao: this.getDataCriacao(),
                    dataEdicao: this.getDataEdicao(),
                    usuarioId: this.getUsuarioId(),
                }),
            });

            if (response.ok) {
                console.log("Carteira adicionada com sucesso.");
                return true;
            } else {
                console.error("Erro ao adicionar carteira:", response.statusText);
                return false;
            }
        } catch (error) {
            console.error("Erro na requisição:", error);
            return false;
        }
    }

    removerCarteira(): boolean {
        console.log("Carteira removida com sucesso.");
        return true;
    }

    editarCarteira(nome: string, moeda: string, saldo: number): boolean {
        //this.setNome(nome);
        //this.setMoeda(moeda);
        //this.setSaldo(saldo);
        console.log("Carteira editada com sucesso.");
        return true;
    }

    atualizarSaldoCarteira(saldo: number): boolean {
        //this.setSaldo(saldo);
        console.log("Saldo da carteira atualizado com sucesso.");
        return true;
    }

    localizarCarteira(): Carteira[] {
        console.log("Localizando carteiras...");
        return [this];
    }


    public async listarCarteiras(usuarioId: number): Promise<Carteira[]> {
            try {
                const response = await fetch(`http://localhost:5000/carteira?usuarioId=${usuarioId}`);
                if (response.ok) {
                    const carteirasJson = await response.json();
                    return carteirasJson.map((carteira: any) => new Carteira(
                        carteira.id,
                        carteira.nome,
                        carteira.moeda,
                        carteira.saldo,
                        new Date(carteira.dataCriacao),
                        new Date(carteira.dataEdicao),
                        carteira.usuarioId
                    ));
                } else {
                    console.error("Erro ao buscar carteiras:", response.statusText);
                    return [];
                }
            } catch (error) {
                console.error("Erro na requisição:", error);
                return [];
            }
        }
    

}

export default Carteira;