import { Conta } from "./conta";

export class Cliente {

    private nome:string;
    private salario:number;
    private conta:Conta; 

    constructor(nome:string, salario:number, conta:Conta){
        this.nome = nome;
        this.salario = salario;
        this.conta = conta;
    }
    
    setNome(nome:string){
        this.nome = nome;
    }

    getNome():string{
        return this.nome;
    }

    setSalario(salario:number){
        this.salario = salario;
    }

    getSalario():number{
        return this.salario;
    }

    setConta(conta:Conta){
        this.conta = conta;
    }

    getConta():Conta{
        return this.conta;
    }
}
