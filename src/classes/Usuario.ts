
class Usuario {
    id: number;
    nome: string;
    email: string;
    senha: string;
    dataCadastro: Date;

    constructor(id: number, nome: string, email: string, senha: string, dataCadastro: Date) {
        this.id = id;
        this.nome = nome;
        this.email = email;
        this.senha = senha;
        this.dataCadastro = dataCadastro;
    }

    cadastrar(): boolean {
        console.log("Cadastrar usuário");
        return true;
    }

    fazerLogin(): boolean {
        console.log("Fazer login do usuário");
        return true;
    }

    editarPerfil(): boolean {
        console.log("Editar perfil do usuário");
        return true;
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
