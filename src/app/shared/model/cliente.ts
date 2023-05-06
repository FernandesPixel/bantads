import { Conta } from "./conta";
import { Endereco } from "./endereco";

export class Cliente {
    private id:number = 0;
    private nome:string = "";
    private salario:number = 0;
    //private conta:Conta = new Conta();

    constructor(){}

    // constructor(nome:string, salario:number, conta:Conta){
    //     this.nome = nome;
    //     this.salario = salario;
    //     this.conta = conta;
    // }
    
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
