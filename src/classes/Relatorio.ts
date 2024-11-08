
class Relatorio {
    periodo: string;
    totalReceitas: number;
    totalDespesas: number;
    saldo: number;
    usuarioId: number;  

    constructor(periodo: string, totalReceitas: number, totalDespesas: number, saldo: number, usuarioId: number) {
        this.periodo = periodo;
        this.totalReceitas = totalReceitas;
        this.totalDespesas = totalDespesas;
        this.saldo = saldo;
        this.usuarioId = usuarioId;
    }

    gerar(): boolean {
        console.log("Gerar relatório");
        return true;
    }

    visualizar(): boolean {
        console.log("Visualizar relatório");
        return true;
    }
}

export default Relatorio;
