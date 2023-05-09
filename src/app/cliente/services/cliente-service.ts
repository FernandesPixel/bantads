import { Operacao } from './../../shared/operacao.enum';
import { Injectable } from '@angular/core';
import { Cliente } from 'src/app/shared/model/cliente';
import { Usuario } from 'src/app/shared/model/usuario.model';
import { Conta } from 'src/app/shared/model/conta';
import { StatusConta } from 'src/app/shared/model/status-conta.enum';
import { Gerente } from 'src/app/shared/model/gerente';
import { Extrato } from 'src/app/shared/extrato';
import { ClienteTransacao } from 'src/app/shared/cliente-transacao';
import { Transferencia } from 'src/app/shared/transferencia';

const LS_CHAVE:string = 'clientes';
const USER_CHAVE:string = 'usuarios';
const TRANSFERENCIA:string= 'transferencia';

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
    cliente.conta.extratos.push(this.gerarExtrato(Operacao.DEPOSITO,quantia));
    this.atualizar(cliente); 
  }

  sacar(cliente:Cliente, quantia:number): boolean{
    if(this.debitar(cliente.conta, quantia)){
      cliente.conta.extratos.push(this.gerarExtrato(Operacao.SAQUE, quantia));
      this.atualizarConta(cliente.conta);
      return true;
    }
    return false;
  }

  transferir(clienteDebitado:Cliente, clienteCreditado:Cliente, quantia:number):boolean{
    let contaDebitada:Conta = clienteDebitado.conta;
    let contaCreditada:Conta = clienteCreditado.conta;
    if(quantia>0 && (contaDebitada.saldo+contaDebitada.limite)>quantia){
      if(this.debitar(contaDebitada, quantia)){
        this.creditar(contaCreditada, quantia)
        this.gerarExtratoTransferencia(clienteDebitado, clienteCreditado, quantia);
      }
      return true;
    }
    return false;
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

  buscarClientePelaContaId(contaId:Number):Cliente | undefined{
    const clientes: Cliente[] = this.listarTodos();
    let cliente = clientes.find(cliente => cliente.conta.id === Number(contaId));
    return cliente;
  }

  listarTransferencias():Transferencia[]{
    const transferencias = localStorage[TRANSFERENCIA];
    return transferencias ? JSON.parse(transferencias) : [];
  }

  buscarTransferencias(contaId:number){
    let transferencias:Transferencia[] = this.listarTransferencias();
    transferencias.find(transferencia => { transferencia.clientePagador.id == Number(contaId)
      || transferencia.clienteRecebedor.id == Number(contaId) });
    return transferencias;
  }

  gerarExtratoTransferencia(clienteDebitado:Cliente, clienteCreditado:Cliente, valor:number){
    let transferencia:Transferencia = new Transferencia();
    transferencia.clientePagador = clienteDebitado;
    transferencia.clienteRecebedor=clienteCreditado;
    transferencia.operacao=Operacao.TRANSFERENCIA;
    transferencia.data=new Date();
    transferencia.valor=valor;
    
    let transferencias = this.listarTransferencias();
    transferencias.push(transferencia);
    localStorage[TRANSFERENCIA]= JSON.stringify(transferencias);
  }

  gerarExtrato(operacao:Operacao,  valor:number):Extrato{
    let extrato:Extrato= new Extrato();
    extrato.operacao=operacao;
    extrato.valor=valor;
    extrato.data=new Date();
    return extrato
  }
}
