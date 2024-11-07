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
  
    cadastrar(): void {
      console.log('Usuário cadastrado');
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