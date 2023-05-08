import { Conta } from "./conta";
import { Endereco } from "./endereco";
import { Gerente } from "./gerente";
import { StatusConta } from "./status-conta.enum";
import { Usuario } from "./usuario.model";

export class Cliente extends Usuario{
    
    constructor(
        override id?: number,
        override nome?: string,
        override login?: string,
        override senha?: string,
        override perfil?: string,
        public email? :string,
        public cpf? :string,
        public endereco? :Endereco,
        public telefone? :string,
        public salario :number = 0,
        public conta: Conta = new Conta()
    ){
        super(id, nome, login, senha, perfil);
        if(salario && salario > 2000){
            this.conta.limite=salario/2;
        }
    }
}
