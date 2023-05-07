import { Gerente } from "./gerente";
import { StatusConta } from "./status-conta.enum";

export class Conta {
    constructor(
        public id? :number,
        public saldo :number = 0,
        public limite :number = 0,
        public status :StatusConta = StatusConta.PENDENTE,
        public gerente :Gerente = new Gerente()
    ){}

}
