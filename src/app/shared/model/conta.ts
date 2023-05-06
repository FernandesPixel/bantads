import { Gerente } from "./gerente";
import { StatusConta } from "./status-conta.enum";

export class Conta {
    constructor(
        public id? :number,
        public limite? :number,
        public status? :StatusConta,
        public gerente? :Gerente
    ){}

}
