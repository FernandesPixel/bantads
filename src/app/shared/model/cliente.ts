// import { Conta } from "./conta";

import { Conta } from "./conta";

export class Cliente {
    public conta? :Conta;
    
    constructor(
        public id? :number,
        public nome? :string,
        public salario? :number
    ){}
}
