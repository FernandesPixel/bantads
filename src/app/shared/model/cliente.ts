import { Conta } from "./conta";
import { StatusConta } from "./status-conta.enum";

export class Cliente {
    public conta? :Conta = new Conta(
        new Date().getMilliseconds(),
        undefined,
        StatusConta.PENDENTE,
        undefined
    );
    
    constructor(
        public id? :number,
        public nome? :string,
        public salario? :number
    ){}
}
