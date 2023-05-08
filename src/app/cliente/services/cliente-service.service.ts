// import { Injectable } from '@angular/core';
// import { Cliente } from 'src/app/shared/model/cliente';

// const LS_CHAVE:string = 'clientes';

// @Injectable({
//   providedIn: 'root'
// })
// export class ClienteServiceService {

//   constructor() { }

//   listarTodos(): Cliente[]{
//     const clientes = localStorage[LS_CHAVE];
//     return clientes ? JSON.parse(clientes) : [];
//   }

//   cadastrar(cliente:Cliente): void{
//     const clientes = this.listarTodos();

//     cliente.id = new Date().getMilliseconds(); 

//     clientes.push(cliente);

//     localStorage[LS_CHAVE] = JSON.stringify(clientes);
//     console.log("entro 2");
//   }
// }
