
import Carteira from "./Carteira.ts";

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
    
        const novoUsuario = {

            id: this.getId().toString(),
            nome: this.getNome(),
            email: this.getEmail(),
            senha: this.getSenha(),
            data: this.getDataCadastro(),
            dataEditar : this.getDataEditar()

        };

        try {
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
        console.error('Erro de conexão:', error);
        this.mensagem = 'Erro de conexão';  
        return false;
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
                    console.log('Usuário encontrado!');
    
                    this.setId(usuario.id);
                    this.setNome(usuario.nome);
                    this.setEmail(usuario.email);
                    this.setSenha(usuario.senha);
                    this.setData(usuario.data);
                    this.setEditarData(usuario.dataEditar);
    
                    console.log('Nome do usuário:', this.getNome());
                    console.log('Email do usuário:', this.getEmail());
                    console.log('Senha do usuário:', this.getSenha());
    
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

    async editarCarteira(id: number, nome: string, moeda: string, saldo: number, dataEditar: Date, usuarioId: number): Promise<boolean> {
        if (!id) {
            console.error("ID da carteira não encontrado!");
            return false;
        }
    
        console.log("Editando carteira...");
        console.log('Usuario ID antes de editar:', usuarioId);  // Verifique o valor
    
        const url = `http://localhost:5000/carteira/${id}`;
    
        const corpoRequisicao = {
            id: id,  // Se você precisa enviar o id da instância atual
            nome: nome,
            moeda: moeda,
            saldo : saldo,
            dataCriacao: this.getDataCadastro(),
            dataEditar : dataEditar,
            usuarioId : usuarioId,
        };
    
        console.log('Corpo da requisição:', corpoRequisicao);  // Depuração do corpo
    
        try {
            const response = await fetch(url, {
                method: 'PUT', // ou 'PATCH', dependendo da sua API
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(corpoRequisicao),
            });
    
            if (response.ok) {
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

    recuperarSenha(): boolean {
        console.log("Recuperar senha do usuário");
        return true;
    }
}

export default Usuario;
