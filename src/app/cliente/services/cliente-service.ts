import { Injectable } from '@angular/core';
import { Cliente } from 'src/app/shared/model/cliente';
import { Usuario } from 'src/app/shared/model/usuario.model';
import { Conta } from 'src/app/shared/model/conta';
import { StatusConta } from 'src/app/shared/model/status-conta.enum';
import { Gerente } from 'src/app/shared/model/gerente';

const LS_CHAVE:string = 'clientes';
const USER_CHAVE:string = 'usuarios';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  constructor() { }

  listarTodos(): Cliente[]{
    const clientes = localStorage[LS_CHAVE];
    return clientes ? JSON.parse(clientes) : [];
  }

  listarUsuarios(): Usuario[]{
    const usuarios = localStorage[USER_CHAVE];
    return usuarios ? JSON.parse(usuarios) : [];
  }

  buscarUsuario(login: string, senha:string): Usuario | null{
    const usuarios: Usuario[] = this.listarUsuarios();
    let usuario = usuarios.find(usuario => usuario.login === login && usuario.senha === senha);
    return usuario===undefined?null:usuario;
  }

  cadastrarUsuario(usuario: Usuario){
    const usuarios = this.listarUsuarios();
    usuarios.push(usuario);
    localStorage[USER_CHAVE] = JSON.stringify(usuarios);
  }

  cadastrar(cliente:Cliente): void{
    if(this.clienteValido(cliente)){
      cliente.senha = this.gerarSenhaAleatoria();
      cliente.id = new Date().getMilliseconds();
      cliente.login = cliente.email;
      cliente.perfil = "CLIENTE";
      cliente.conta = this.criarConta(cliente.salario);
      
      console.log(cliente.senha)

      const clientes = this.listarTodos();
      clientes.push(cliente);
      localStorage[LS_CHAVE] = JSON.stringify(clientes);
      this.cadastrarUsuario(cliente);
    }
  }

  criarConta(salario:number):Conta{
    let gerente = new Gerente(1,"Gerente");
    let conta = new Conta(new Date().getMilliseconds(),0,salario/2,StatusConta.PENDENTE,gerente);
    return conta;
  }

  clienteValido(cliente:Cliente):boolean{
    let clientes = this.listarTodos();
    if(clientes.find(clienteCadastrado => clienteCadastrado.cpf === cliente.cpf )){
      return false;
    }
    return true;
  }

  buscarPorId(id:number):Cliente | undefined{
    const clientes: Cliente[] = this.listarTodos();
    return clientes.find(cliente => cliente.id === id);
  }

  atualizar(cliente: Cliente): void{
    const clientes: Cliente[] = this.listarTodos();

    clientes.forEach((obj, index, objs) => {
      if(cliente.id === obj.id){
        let clienteAntigo = obj;
        if(cliente.salario !== clienteAntigo.salario){
          if(cliente.conta && cliente.salario && clienteAntigo.salario){
            cliente.conta.limite = this.calcularNovoLimite(cliente.salario,clienteAntigo.salario,cliente.conta.saldo);
          }
        }
        console.log(cliente.id);
        console.log(cliente);
        objs[index] = cliente;
      }
    });

    console.log(clientes);
    localStorage[LS_CHAVE] = JSON.stringify(clientes);

  }

  private calcularNovoLimite(novoSalario:number, antigoSalario:number, saldo:number):number{
    let novoLimite = novoSalario/2;
    if(saldo<0 && novoLimite<saldo){
      novoLimite = saldo;
    }
    return novoLimite;
  }

  remover(id:number):void{
    let clientes: Cliente[] = this.listarTodos();

    clientes = clientes.filter(cliente => cliente.id !== id);

    localStorage[LS_CHAVE] = JSON.stringify(clientes);
  }

  gerarSenhaAleatoria():string {
    const caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let senha = '';
    let tamanho = 10;
    for (let i = 0; i < tamanho; i++) {
      const indice = Math.floor(Math.random() * caracteres.length);
      senha += caracteres.charAt(indice);
    }
    return senha;
  }

  depositar(cliente:Cliente, quantia:number){
    cliente.conta.saldo = Number(cliente.conta.saldo) + Number(quantia);
    if(cliente.conta.saldo >= 0){
      cliente.conta.limite = cliente.salario/2;
    }
    this.atualizar(cliente); 
  }

  sacar(cliente:Cliente, quantia:number): boolean{
    return this.debitar(cliente.conta, quantia);
  }

  debitar(conta:Conta, quantia:number):boolean{
    let saldo:number = conta.saldo;
    let limite: number = conta.limite;
    if(saldo+limite>quantia){
      conta.saldo = Number(conta.saldo) - Number(quantia);
      if(saldo-quantia<0){
        quantia = quantia - saldo;
        conta.limite = limite - Number(quantia);
      }
      this.atualizarConta(conta);
      return true;
    }
    return false;
  }

  creditar(conta:Conta, quantia:number){
    conta.saldo = Number(conta.saldo) + Number(quantia); 
    this.atualizarConta(conta);
  }

  atualizarConta(conta:Conta){
    const clientes: Cliente[] = this.listarTodos();
    clientes.forEach((obj, index, objs) => {
      if(conta.id === obj.conta.id){
        objs[index].conta = conta;
      }
    });
    localStorage[LS_CHAVE] = JSON.stringify(clientes);
  }

  buscarConta(contaId:Number):Conta | undefined{
    const clientes: Cliente[] = this.listarTodos();
    let cliente = clientes.find(cliente => cliente.conta.id === Number(contaId));
    return cliente?.conta;
  }

  transferir(contaDebitada:Conta, contaCreditada:Conta, quantia:number){
    if(quantia>0 && (contaDebitada.saldo+contaDebitada.limite)>quantia){
      this.debitar(contaDebitada, quantia);
      this.creditar(contaCreditada, quantia);
    }
  }
}
