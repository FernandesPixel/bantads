import { Injectable } from '@angular/core';
import { Cliente } from 'src/app/shared/model/cliente';

const LS_CHAVE:string = 'clientes';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  constructor() { }

  listarTodos(): Cliente[]{
    const clientes = localStorage[LS_CHAVE];
    return clientes ? JSON.parse(clientes) : [];
  }

  cadastrar(cliente:Cliente): void{
    const clientes = this.listarTodos();

    cliente.id = new Date().getMilliseconds(); 

    clientes.push(cliente);

    localStorage[LS_CHAVE] = JSON.stringify(clientes);
  }

  buscarPorId(id:number):Cliente | undefined{
    const clientes: Cliente[] = this.listarTodos();

    return clientes.find(cliente => cliente.id === id);
  }

  atualizar(cliente: Cliente): void{
    const clientes: Cliente[] = this.listarTodos();

    clientes.forEach((obj, index, objs) => {
      if(cliente.id === obj.id){
        objs[index] = cliente;
      }
    });

    console.log(clientes);
    localStorage[LS_CHAVE] = JSON.stringify(clientes);

  }


}
