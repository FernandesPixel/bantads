// import { Conta } from "./conta";

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
    
    public get getId(): number {
        return this.id;
      }
    
    public set setId(id: number) {
        this.id = id;
    }

    public get getNome(): string {
        return this.nome;
      }
    
    public set setNome(nome: string) {
        this.nome = nome;
    }

    public set setSalario(salario:number){
        this.salario = salario;
    }

    public get getSalario():number{
        return this.salario;
    }

    // public set setConta(conta:Conta){
    //     this.conta = conta;
    // }

    // public get getConta():Conta{
    //     return this.conta;
    // }
}
