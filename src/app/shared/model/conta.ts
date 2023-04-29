import { Gerente } from "./gerente";

export class Conta {
    private id:number;
    private limite:number;
    private status:string;
    private gerente:Gerente;

    constructor(id:number, limite:number, gerente:Gerente){
        this.id = id;
        this.limite = limite;
        this.status = "APROVACAO_PENDENTE";
        this.gerente = gerente;
    }

}
