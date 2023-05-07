import { Conta } from "./conta";
import { Endereco } from "./endereco";
import { StatusConta } from "./status-conta.enum";
import { Usuario } from "./usuario.model";

export class Cliente extends Usuario{
    public conta? :Conta = new Conta(
        new Date().getMilliseconds(),
        0,
        undefined,
        StatusConta.PENDENTE,
        undefined
    );
    
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
        public salario? :number
    ){
        super(id, nome, login, senha, perfil);
        this.conta = new Conta();
        if(salario && salario > 2000){
            this.conta.limite=salario/2;
        }
    }
}
