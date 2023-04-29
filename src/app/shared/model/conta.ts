import { Gerente } from "./gerente";

export class Conta {
    constructor(
        public id? :number,
        public limite? :number,
        public status? :string,
        public gerente? :Gerente
    ){}

}
