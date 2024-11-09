class Usuario {

    private id: number;
    private nome: string;
    private email: string;
    private senha: string;
    private dataCadastro: Date;
  
    constructor(id: number, nome: string, email: string, senha: string) {
      this.id = id;
      this.nome = nome;
      this.email = email;
      this.senha = senha;
      this.dataCadastro = new Date();
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
  
    setNome(novoNome: string): void {
      this.nome = novoNome;
    }
  
    setEmail(novoEmail: string): void {
      this.email = novoEmail;
    }
  
    setSenha(novaSenha: string): void {
      this.senha = novaSenha;
    }
  
    // Método para cadastrar o usuário no db.json
    async cadastrar(): Promise<boolean> {
      
      const novoUsuario = {
        id: this.getId(),
        nome: this.getNome(),
        email: this.getEmail(),
        senha: this.getSenha()
      };

      // Envia o novo usuário para o servidor do json-server
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
        return false;
      }
    }
  
    fazerLogin(): void {
      console.log('Usuário logado');
    }
  
    editarPerfil(novoNome?: string, novoEmail?: string): void {
      if (novoNome) {
        this.setNome(novoNome);
      }
      if (novoEmail) {
        this.setEmail(novoEmail);
      }
      console.log('Perfil editado');
    }
  
    excluirConta(): void {
      console.log('Conta excluída');
    }
  
    recuperarSenha(): void {
      console.log('Senha recuperada');
    }
  }
  
  export default Usuario;