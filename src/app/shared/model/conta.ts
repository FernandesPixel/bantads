import { Gerente } from "./gerente";

export class Conta {
    constructor(
        public id? :number,
        public saldo :number = 0,
        public limite :number = 0,
        public status :string = "APROVACAO_PENDENTE",
        public gerente :Gerente = new Gerente()
    ){}

}
