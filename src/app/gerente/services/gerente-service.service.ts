import { Injectable } from '@angular/core';
import { Cliente } from 'src/app/shared/model/cliente';
import { StatusConta } from 'src/app/shared/model/status-conta.enum';

const LS_CHAVE:string = 'clientes';

@Injectable({
  providedIn: 'root'
})
export class GerenteService {

  constructor() { }

  listarTodos(): Cliente[]{
    const clientes = localStorage[LS_CHAVE];
    return clientes ? JSON.parse(clientes) : [];
  }

  obterClientesPendentes(): Cliente[] {
    const clientes = this.listarTodos();
    return clientes.filter(
      cliente => cliente.conta &&
      cliente.conta.status === StatusConta.PENDENTE
    );
  }

  obterClientesAtivos(): Cliente[] {
    const clientes = this.listarTodos();
    return clientes.filter(
      cliente => cliente.conta &&
      cliente.conta.status === StatusConta.ATIVA
    ).sort((cliente1, cliente2) => {
      if (cliente1.nome < cliente2.nome) {
        return -1;
      }
      if (cliente1.nome > cliente2.nome) {
        return 1;
      }
      return 0;
    });
  }

  obterMlehoresClientes(): Cliente[] {
    const clientes = this.listarTodos();
    return clientes.filter(
      cliente => cliente.conta &&
      cliente.conta.status === StatusConta.ATIVA
    )
    .sort((cliente1, cliente2) => {
      if (cliente1.conta.saldo > cliente2.conta.saldo) {
        return -1;
      }
      if (cliente1.conta.saldo < cliente2.conta.saldo) {
        return 1;
      }
      return 0;
    })
    .slice(0,3);
  }

  private atualizarCliente(cliente: Cliente): void {
    const clientes = this.listarTodos();
    const clienteIndex = clientes.findIndex(c => c.id === cliente.id);
    if (clienteIndex !== -1) {
      clientes[clienteIndex] = cliente;
      localStorage[LS_CHAVE] = JSON.stringify(clientes);
    }
  }

  aprovarCliente(cliente: Cliente): void {
    if (cliente.conta) {
      cliente.conta.status = StatusConta.ATIVA;
      console.log(`Cliente ${cliente.nome} aprovado!`);
      this.atualizarCliente(cliente);
    }
  }

  recusarCliente(cliente: Cliente, motivo: string): void {
    if (cliente.conta) {
      cliente.conta.status = StatusConta.RECUSADA;
      console.log(`Cliente ${cliente.nome} recusado. Motivo: ${motivo}`);
      this.atualizarCliente(cliente);
    }
  }
}
