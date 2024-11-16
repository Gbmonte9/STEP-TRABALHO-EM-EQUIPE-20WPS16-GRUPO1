
class Despesa {
    private id: number;
    private descricao: string;
    private despensa: string;
    private valor: number;
    private data: Date;
    private dataEditar: Date;
    private carteiraId: number;
    private usuarioId: number;

    constructor(id: number = 0, descricao: string = '', despensa: string = '', valor: number = 0, data: Date = new Date(), dataEditar: Date = new Date(), carteiraId: number = 0, usuarioId: number = 0) {
        this.id = id;
        this.descricao = descricao;
        this.despensa = despensa;
        this.valor = valor;
        this.data = data;
        this.dataEditar = dataEditar;
        this.carteiraId = carteiraId;
        this.usuarioId = usuarioId;  
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

    getDataEditar(): Date {
        return this.dataEditar;
    }

    getDespensa(): string {
        return this.despensa;
    }

    getCarteiraId(): number {
        return this.carteiraId;
    }

    getUsuarioId(): number {
        return this.usuarioId;
    }

    setId(id: number): void {
        this.id = id;
    }

    setDescricao(descricao: string): void {
        this.descricao = descricao;
    }

    setValor(valor: number): void {
        this.valor = valor;
    }

    setData(data: Date): void {
        this.data = data;
    }

    setDataEditar(dataEditar: Date): void {
        this.dataEditar = dataEditar;
    }

    setDespensa(despensa: string): void {
        this.despensa = despensa;
    }

    setCarteiraId(carteiraId: number): void {
        this.carteiraId = carteiraId;
    }

    setUsuarioId(usuarioId: number): void {
        this.usuarioId = usuarioId;
    }

    public async adicionarDespesa(): Promise<boolean> {
        try {
            const response = await fetch("http://localhost:5000/despesa", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    id: this.getId().toString(),
                    descricao: this.getDescricao(),
                    valor: this.getValor(),
                    categoria: this.getDespensa(),
                    data: this.getData(),
                    dataEditar: this.getDataEditar(),
                    carteiraId: this.getCarteiraId().toString(),
                    usuarioId: this.getUsuarioId().toString(),
                }),
            });
    
            if (response.ok) {
                console.log("Despesa adicionada com sucesso.");
                return true;
            } else {
                console.error("Erro ao adicionar despesa:", response.statusText);
                return false;
            }
        } catch (error) {
            console.error("Erro na requisição:", error);
            return false;
        }
    }

    async excluirDespesa(id: number): Promise<boolean> {
        console.log(`Removendo despesa com ID: ${id}`);

        const url = `http://localhost:5000/despesa/${id}`;  

        try {
            const response = await fetch(url, {
                method: 'DELETE',  
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.status === 200) {
                console.log('Fonte de renda excluída com sucesso!');
                return true;
            } else {
                const errorData = await response.json();
                console.error('Erro ao excluir a fonte de renda:', errorData.message || response.statusText);
                return false;
            }
        } catch (error) {
            console.error('Erro de conexão:', error);
            return false;
        }
    }

    async editarDespesa(
        id: number,
        descricao: string,
        categoria: string,
        valor: number,
        dataEditar: Date,
        carteiraId: number
    ): Promise<boolean> {
        
        try {
            await this.localizarDespesa(id);
        } catch (error) {
            console.error("Erro ao localizar a despesa:", error);
            return false;
        }
    
        console.log("Editando despesa...");
        console.log('ID da despesa antes de editar:', id);
    
        const url = `http://localhost:5000/despesa/${id}`;  
    
        const corpoRequisicao = {
            id : id.toString(), 
            descricao,
            categoria,
            valor,
            dataEditar: dataEditar.toISOString(),  
            data: this.getData(),  
            carteiraId: carteiraId.toString(),  
            usuarioId: this.getUsuarioId().toString()  
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
                console.log('Despesa editada com sucesso!');
                return true;
            } else {
                const errorData = await response.json();
                console.error('Erro ao editar a despesa:', errorData.message || response.statusText);
                return false;
            }
        } catch (error) {
            console.error('Erro de conexão:', error);
            return false;
        }
    }

    public async localizarDespesa(id: number): Promise<boolean> {
        
        const url = `http://localhost:5000/despesa/${id}`; 
        
        try {
            const response = await fetch(url, {
                method: 'GET', 
                headers: {
                    'Content-Type': 'application/json', 
                },
            });
    
            if (response.ok) {
                const despesa = await response.json(); 
                
                if (despesa) {
                    console.log('Despesa encontrada!');
                    
                    this.setId(despesa.id);
                    this.setDescricao(despesa.descricao);
                    this.setValor(despesa.valor);
                    this.setData(despesa.data);
                    this.setDataEditar(despesa.dataEditar);
                    this.setDespensa(despesa.categoria);
                    this.setCarteiraId(despesa.carteiraId);
                    this.setUsuarioId(despesa.usuarioId);
    
                    console.log('Descrição da despesa:', this.getDescricao());
                    console.log('Valor da despesa:', this.getValor());
                    console.log('Data da despesa:', this.getData());
                    console.log('Categoria da despesa:', this.getDespensa());
                    console.log(`UsuarioId `, this.getUsuarioId()); 
    
                    return true; 
                } else {
                    console.error('Despesa não encontrada');
                    return false; 
                }
    
            } else {
                console.error('Erro ao localizar a despesa');
                return false;
            }
    
        } catch (error) {
            console.error('Erro de conexão:', error);
            return false; 
        }
    }

    public async listarDespesas(usuarioId: number): Promise<Despesa[]> {
        try {
            const response = await fetch(`http://localhost:5000/despesa?usuarioId=${usuarioId}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });
            
            if (response.ok) {
                const despesasJson = await response.json();
                return despesasJson.map((despesa: any) => new Despesa(
                    despesa.id,
                    despesa.descricao,
                    despesa.categoria,
                    despesa.valor,
                    new Date(despesa.data),
                    new Date(despesa.dataEditar),
                    despesa.carteiraId,
                    despesa.usuarioId
                ));
            } else {
                console.error("Erro ao buscar despesas:", response.statusText);
                return [];
            }
        } catch (error) {
            console.error("Erro na requisição:", error);
            return [];
        }
    }

    public async listarDespesa(usuarioId: number): Promise<Despesa[]> {
        try {
            const response = await fetch(`http://localhost:5000/despesa?usuarioId=${usuarioId}`);
            
            if (response.ok) {
                const despesasJson = await response.json();
                
                const despesasFiltradas = despesasJson.filter((despesa: any) => String(despesa.usuarioId) === String(usuarioId));
        
                return despesasFiltradas.map((despesa: any) => new Despesa(
                    despesa.id,
                    despesa.descricao,
                    despesa.categoria,
                    despesa.valor,
                    new Date(despesa.data),
                    new Date(despesa.dataEditar),
                    despesa.carteiraId,
                    despesa.usuarioId
                ));
            } else {
                console.error("Erro ao buscar despesas:", response.statusText);
                return [];
            }
        } catch (error) {
            console.error("Erro na requisição:", error);
            return [];
        }
    }

}

export default Despesa;