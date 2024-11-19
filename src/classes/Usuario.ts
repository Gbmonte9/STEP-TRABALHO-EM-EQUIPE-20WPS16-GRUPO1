
import Carteira from "./Carteira.ts";
import Despesa from "./Despesa.ts";
import FonteDeRenda from "./FonteDeRenda.ts";

class Usuario {
    
    private id: number;
    private nome: string;
    private email: string;
    private senha: string;
    private dataCadastro: Date;
    private dataEditar: Date;
    public mensagem: string;
    private carteiras: Carteira[];  
  
    constructor(
      id?: number, 
      nome?: string, 
      email?: string, 
      senha?: string, 
      dataCadastro?: Date, 
      dataEditar?: Date,
      mensagem?: string
    ) {
      this.id = id ?? 0;  
      this.nome = nome ?? '';
      this.email = email ?? '';
      this.senha = senha ?? '';
      this.dataCadastro = dataCadastro ?? new Date();  
      this.dataEditar = dataEditar ?? new Date();     
      this.mensagem = mensagem ?? '';                  
      this.carteiras = [];                              
    }
  
    public adicionarCarteira(carteira: Carteira): void {
      this.carteiras.push(carteira);  
    }
  
    public listarCarteiras(): Carteira[] {
      return this.carteiras; 
    }

    getId(): number {
        return this.id;
    }
      
    getNome(): string {
        return this.nome;
    }
      
    getEmail(): string {
        return this.email;
    }
    
    getSenha(): string {
        return this.senha;
    }
      
    getDataCadastro(): Date {
        return this.dataCadastro;
    }

    getDataEditar(): Date {
        return this.dataEditar;
    }

    setId(novoId: number): void {
        this.id = novoId;
    }

    setData(novaData: Date) : void {
        this.dataCadastro = novaData;
    }

    setEditarData(novaDataEditado: Date) : void {
        this.dataEditar = novaDataEditado;
    }
      
    setNome(novoNome: string): void {
        this.nome = novoNome;
    }
      
    setEmail(novoEmail: string): void {
        this.email = novoEmail;
    }
      
    setSenha(novaSenha: string): void {
    this.senha = novaSenha;
    }

    async cadastrarUsuario(): Promise<boolean> {
        try {
            
            await this.verificarEmailExiste(this.getEmail());
    
            const novoUsuario = {
                id: this.getId().toString(),
                nome: this.getNome(),
                email: this.getEmail(),
                senha: this.getSenha(),
                data: this.getDataCadastro(),
                dataEditar: this.getDataEditar(),
            };
    
            const response = await fetch('http://localhost:5000/usuarios', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(novoUsuario),
            });
    
            if (response.ok) {
                console.log('Usuário cadastrado com sucesso!');
                return true;
            } else {
                console.error('Erro ao cadastrar usuário.');
                return false;
            }
        } catch (error) {
            const errorMessage = (error as Error).message || 'Erro de conexão';
            console.error('Erro:', errorMessage);
            this.mensagem = errorMessage;
            return false;
        }
    }

    async verificarEmailExiste(email: string): Promise<void> {
        try {
            const response = await fetch(`http://localhost:5000/usuarios?email=${encodeURIComponent(email)}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
    
            if (response.ok) {
                const data = await response.json();
    
                if (data && data.length > 0) {
                    throw new Error('Este e-mail já está cadastrado. Tente outro.');
                }
            } else {
                throw new Error('Erro ao verificar e-mail no servidor.');
            }
        } catch (error) {
            console.error('Erro ao verificar e-mail:', error);
            throw error; 
        }
    }

    async usuarioLogin(email: string, senha: string): Promise<boolean> {

        const url = 'http://localhost:5000/usuarios';  

        try {
            const response = await fetch(url, {
                method: 'GET',  
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.ok) {
                const usuarios = await response.json();  
                const usuarioEncontrado = usuarios.find(
                    (usuario: { email: string; senha: string, id: number, nome: string }) =>
                        usuario.email === email && usuario.senha === senha
                );

                if (usuarioEncontrado) {
                    console.log('Login bem-sucedido!');
                    this.mensagem = 'Login bem-sucedido';  
                    this.setId(usuarioEncontrado.id);  
                    this.setNome(usuarioEncontrado.nome);  
                    return true;
                } else {
                    this.mensagem = 'Email ou senha inválidos';  
                    return false;
                }
            } else {
                this.mensagem = 'Erro ao fazer login, tente novamente';  
                return false;
            }
        } catch (error) {
            this.mensagem = 'Erro de conexão, tente novamente mais tarde';  
            return false;
        }
    }

    async localizarUsuario(id: number): Promise<boolean> {

        const url = `http://localhost:5000/usuarios/${id}`;  
        
        try {

            const response = await fetch(url, {
                method: 'GET',  
                headers: {
                    'Content-Type': 'application/json',
                },
            });
    
            if (response.ok) {
                const usuario = await response.json();  
    
                if (usuario) {
    
                    this.setId(usuario.id);
                    this.setNome(usuario.nome);
                    this.setEmail(usuario.email);
                    this.setSenha(usuario.senha);
                    this.setData(usuario.data);
                    this.setEditarData(usuario.dataEditar);
    
                    return true;  
                } else {
                    console.error('Usuário não encontrado');
                    return false;  
                }

            } else {
                console.error('Erro ao localizar o usuário');
                return false; 
            }

        } catch (error) {
            console.error('Erro de conexão:', error);
            return false;  
        }

    }

    async excluirConta(usuarioId: number | null): Promise<boolean> {
        console.log(`Excluindo dados do usuário com ID: ${usuarioId}`);

        if (!usuarioId || typeof usuarioId !== 'number') {
            console.error('ID do usuário inválido ou já excluído.');
            return false;
        }
    
        try {
            const carteira = new Carteira();
            const carteiraExcluida = await carteira.excluirListaCarteira(usuarioId);
            if (!carteiraExcluida) {
                console.error('Falha ao excluir as carteiras.');
                return false;
            }
    
            const despesa = new Despesa();
            const despesaExcluida = await despesa.excluirListaDespesa(usuarioId);
            if (!despesaExcluida) {
                console.error('Falha ao excluir as despesas.');
                return false;
            }
    
            const renda = new FonteDeRenda();
            const rendaExcluida = await renda.excluirListaRenda(usuarioId);
            if (!rendaExcluida) {
                console.error('Falha ao excluir as fontes de renda.');
                return false;
            }
    
            const urlUsuario = `http://localhost:5000/usuarios/${usuarioId}`;
            const responseUsuario = await fetch(urlUsuario, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
    
            if (!responseUsuario.ok) {
                const errorText = await responseUsuario.text();
                console.error('Erro ao excluir a conta do usuário:', errorText);
                return false;
            }
    
            console.log('Conta do usuário excluída com sucesso!');
            console.log('Todos os dados do usuário foram excluídos com sucesso!');
    
            return true;
        } catch (error) {
            if (error instanceof Error) {
                console.error('Erro durante a exclusão:', error.message);
            } else {
                console.error('Erro desconhecido durante a exclusão da conta:', error);
            }
            return false;
        }
    }

    async editarUsuario(
        usuarioId: number, 
        nome: string, 
        email: string, 
        senha: string, 
        dataEditar: Date
    ): Promise<boolean> {
        console.log(`Editando usuário com ID: ${usuarioId}`);
    
        const usuario = await this.localizarUsuario(usuarioId);
        if (!usuario) {
            console.error(`Usuário com ID ${usuarioId} não encontrado.`);
            return false;
        }
    
        const url = `http://localhost:5000/usuarios/${usuarioId}`; 
        
        const dadosAtualizados = {
            id: this.getId(), 
            nome,
            email,
            senha,
            dataCadastro: this.getDataCadastro(),
            dataEditar: dataEditar.toISOString(), 
        };
        
        try {
            const response = await fetch(url, {
                method: 'PUT', 
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(dadosAtualizados),
            });
    
            if (response.status === 200) {
                console.log('Usuário editado com sucesso!');
                this.mensagem = 'Usuário editado com sucesso!'
                return true;
            } else {
                const errorData = await response.json();
                console.error('Erro ao editar o usuário:', errorData.message || response.statusText);
                return false;
            }
        } catch (error) {
            console.error('Erro de conexão:', error);
            return false;
        }
    }

    recuperarSenha(): boolean {
        console.log("Recuperar senha do usuário");
        return true;
    }
}

export default Usuario;
