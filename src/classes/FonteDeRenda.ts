import Usuario from "./Usuario"; 

class FonteDeRenda {
    private id: number;
    private nome: string;
    private valor: number;
    private data: Date;
    private dataEditar: Date;
    private categoria: string;
    private usuarioId: number;

    constructor(id: number = 0, nome: string = '', valor: number = 0, categoria: string = '', data: Date = new Date(), dataEditar: Date = new Date(), usuarioId: number = 0) {
        this.id = id;
        this.nome = nome;
        this.valor = valor;
        this.data = data;
        this.dataEditar = dataEditar;
        this.categoria = categoria;
        this.usuarioId = usuarioId;
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

    getDataEditar(): Date {
        return this.dataEditar;
    }

    setDataEditar(dataEditar: Date): void {
        this.dataEditar = dataEditar;
    }

    getCategoria(): string {
        return this.categoria;
    }

    setCategoria(categoria: string): void {
        this.categoria = categoria;
    }

    getUsuarioId(): number {
        return this.usuarioId;
    }

    setUsuarioId(usuario: number): void {
        this.usuarioId = usuario;
    }

    public async adicionarRenda(): Promise<boolean> {
        try {
            const response = await fetch("http://localhost:5000/renda", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    id: this.getId().toString(),
                    nome: this.getNome(),
                    valor: this.getValor(),
                    categoria: this.getCategoria(),
                    data: this.getData(),
                    dataEditar: this.getDataEditar(),
                    usuario: this.getUsuarioId().toString(),
                }),
            });
    
            if (response.ok) {
                console.log("Renda adicionada com sucesso.");
                return true;
            } else {
                console.error("Erro ao adicionar renda:", response.statusText);
                return false;
            }
        } catch (error) {
            console.error("Erro na requisição:", error);
            return false;
        }
    }

    async editarRenda(
        id: number,
        nome: string,
        categoria: string,
        valor: number,
        dataEditar: Date
    ): Promise<boolean> {
    
        try {
            await this.localizarRenda(id);
        } catch (error) {
            console.error("Erro ao localizar a fonte de renda:", error);
            return false;
        }
    
        console.log("Editando fonte de renda...");
        console.log('ID da fonte de renda antes de editar:', id);
    
        const url = `http://localhost:5000/renda/${id}`;  
    
        const corpoRequisicao = {
            id: this.getId(),
            nome,
            categoria,
            valor,
            dataEditar,
            data: this.getData(), 
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
                console.log('Fonte de renda editada com sucesso!');
                return true;
            } else {
                const errorData = await response.json();
                console.error('Erro ao editar a fonte de renda:', errorData.message || response.statusText);
                return false;
            }
        } catch (error) {
            console.error('Erro de conexão:', error);
            return false;
        }
    }

    public async localizarRenda(id: number): Promise<boolean> {
        const url = `http://localhost:5000/renda/${id}`;  
        
        try {
            const response = await fetch(url, {
                method: 'GET',  
                headers: {
                    'Content-Type': 'application/json',  
                },
            });
    
            if (response.ok) {
                const renda = await response.json(); 
                
                if (renda) {
                    console.log('Fonte de renda encontrada!');
                    
                    this.setId(renda.id);
                    this.setNome(renda.nome);
                    this.setValor(renda.valor);
                    this.setData(renda.data);
                    this.setCategoria(renda.categoria);
                    this.setUsuarioId(renda.usuario);
    
                    console.log('Nome da fonte de renda:', this.getNome());
                    console.log('Valor da fonte de renda:', this.getValor());
                    console.log('Data de criação da fonte de renda:', this.getData());
                    console.log('Categoria da fonte de renda:', this.getCategoria());
    
                    return true;  
                } else {
                    console.error('Fonte de renda não encontrada');
                    return false;  
                }
    
            } else {
                console.error('Erro ao localizar a fonte de renda');
                return false;  
            }
    
        } catch (error) {
            console.error('Erro de conexão:', error);
            return false;  
        }
    }

    public async listarRenda(usuarioId: number): Promise<FonteDeRenda[]> {
        try {
            const response = await fetch(`http://localhost:5000/renda?usuarioId=${usuarioId}`);
            
            if (response.ok) {
                const rendasJson = await response.json();
                return rendasJson.map((renda: any) => new FonteDeRenda(
                    renda.id,
                    renda.nome,
                    renda.valor,
                    renda.categoria,
                    new Date(renda.data),
                    renda.usuarioId
                ));
            } else {
                console.error("Erro ao buscar fontes de renda:", response.statusText);
                return [];
            }
        } catch (error) {
            console.error("Erro na requisição:", error);
            return [];
        }
    }

    async excluirFonte(id: number): Promise<boolean> {
        console.log(`Excluindo fonte de renda com ID: ${id}`);
        
        const url = `http://localhost:5000/renda/${id}`;  
        
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

}

export default FonteDeRenda;