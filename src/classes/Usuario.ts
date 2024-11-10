
class Usuario {

    private id: number;
    private nome: string;
    private email: string;
    private senha: string;
    private dataCadastro: Date;
    private dataEditar: Date;
    public mensagem: string;  

    constructor(id?: number, nome?: string, email?: string, senha?: string, dataCadastro?: Date, dataEditar?: Date,mensagem?: string) {
        this.id = id ?? 0;
        this.nome = nome ?? '';
        this.email = email ?? '';
        this.senha = senha ?? '';
        this.dataCadastro = dataCadastro ?? new Date();
        this.dataEditar = dataEditar ?? new Date();
        this.mensagem = mensagem ?? '';
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

            id: this.getId(),
            nome: this.getNome(),
            email: this.getEmail(),
            senha: this.getSenha(),
            data: this.getDataCadastro()

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

    async editarUsuario(id: number): Promise<boolean> {
        const url = `http://localhost:5000/usuarios/${id}`; 

        const usuarioExistente = await this.localizarUsuario(id);
        
        if (!usuarioExistente) {
            console.error('Usuário não encontrado para atualização');
            return false;  
        }

        const usuarioData = {
            id: id,  
            nome: this.getNome(),
            email: this.getEmail(),
            senha: this.getSenha(),
        };

        try {
         
            const response = await fetch(url, {
                method: 'PUT',  
                headers: {
                    'Content-Type': 'application/json', 
                },
                body: JSON.stringify(usuarioData),  
            });

      
            if (response.ok) {
                console.log('Usuário atualizado com sucesso!');
                return true;
            } else {
             
                console.error('Erro ao atualizar o usuário');
                return false;
            }
        } catch (error) {
          
            console.error('Erro de conexão:', error);
            return false;
        }
    }

    excluirConta(): boolean {
        console.log("Excluir conta do usuário");
        return true;
    }

    recuperarSenha(): boolean {
        console.log("Recuperar senha do usuário");
        return true;
    }
}

export default Usuario;
