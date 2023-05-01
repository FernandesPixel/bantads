// import { Conta } from "./conta";

import { Conta } from "./conta";
import { Endereco } from "./endereco";

export class Cliente {
    public conta? :Conta;
    
    constructor(
        public id? :number,
        public nome? :string,
        public email? :string,
        public cpf? :string,
        public endereco? :Endereco,
        public telefone? :string,
        public salario? :number
    ){}
}
