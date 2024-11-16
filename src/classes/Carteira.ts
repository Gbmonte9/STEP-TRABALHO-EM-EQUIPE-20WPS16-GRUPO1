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

    setId(id: number) {
        this.id = id;
    }

    setDataCriacao(data: Date) {
        this.dataCriacao = data;
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
                    id: this.getId().toString(),
                    nome: this.getNome(),
                    moeda: this.getMoeda(),
                    saldo: this.getSaldo(),
                    dataCriacao: this.getDataCriacao(),
                    dataEdicao: this.getDataEdicao(),
                    usuarioId: this.getUsuarioId().toString(),
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

    async excluirCarteira(idCarteira: number): Promise<boolean> {
        console.log("Excluir carteira");
    
        const url = `http://localhost:5000/carteira/${idCarteira}`;
    
        try {
            const response = await fetch(url, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
    
            if (response.ok) {
                console.log('Carteira excluída com sucesso!');
                return true;
            } else {
                const errorData = await response.json(); 
                console.error('Erro ao excluir a carteira:', errorData.message || response.statusText);
                return false;
            }
        } catch (error) {
            console.error('Erro de conexão:', error);
            return false;
        }
    }

    async editarCarteira(
        id: number, 
        nome: string, 
        moeda: string, 
        saldo: number, 
        dataEditar: Date
    ): Promise<boolean> {
        
        try {
            await this.localizarCarteira(id);
        } catch (error) {
            console.error("Erro ao localizar a carteira:", error);
            return false;
        }
    
        console.log("Editando carteira...");
        console.log('Usuario ID antes de editar:', id);
    
        const url = `http://localhost:5000/carteira/${id}`;
    
        const corpoRequisicao = {
            id: this.getId(),
            nome,
            moeda,
            saldo,
            dataEditar,
            data: this.getDataCriacao(),
            usuarioId: this.getUsuarioId(),
        };
    
        console.log('Corpo da requisição:', corpoRequisicao);
    
        try {
            const response = await fetch(url, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(corpoRequisicao),
            });
    
            if (response.status === 200) {
                console.log('Carteira editada com sucesso!');
                return true;
            } else {
                const errorData = await response.json();
                console.error('Erro ao editar a carteira:', errorData.message || response.statusText);
                return false;
            }
        } catch (error) {
            console.error('Erro de conexão:', error);
            return false;
        }
    }

    public async localizarCarteira(id: number): Promise<boolean> {

        const url = `http://localhost:5000/carteira/${id}`;  
        
        try {
            const response = await fetch(url, {
                method: 'GET',  
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.ok) {
                const carteira = await response.json();  
                
                if (carteira) {
                    console.log('Carteira encontrada!');

                    this.setId(carteira.id);
                    this.setNome(carteira.nome);
                    this.setMoeda(carteira.moeda);
                    this.setSaldo(carteira.saldo);
                    this.setDataCriacao(carteira.dataCriacao);
                    this.setDataEdicao(carteira.dataEdicao);
                    this.setUsuarioId(carteira.usuarioId);

                    console.log('Nome da carteira:', this.getNome());
                    console.log('Moeda da carteira:', this.getMoeda());
                    console.log('Saldo da carteira:', this.getSaldo());
                    console.log('Data de criação da carteira:', this.getDataCriacao());

                    return true;  
                } else {
                    console.error('Carteira não encontrada');
                    return false;  
                }

            } else {
                console.error('Erro ao localizar a carteira');
                return false;  
            }

        } catch (error) {
            console.error('Erro de conexão:', error);
            return false;  
        }
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