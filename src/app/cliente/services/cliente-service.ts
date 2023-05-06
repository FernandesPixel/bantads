import { Injectable } from '@angular/core';
import { Cliente } from 'src/app/shared/model/cliente';
import { Usuario } from 'src/app/shared/model/usuario.model';

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
    const clientes = this.listarTodos();
    cliente.senha = this.gerarSenhaAleatoria();
    cliente.id = new Date().getMilliseconds();
    cliente.login = cliente.email; 
    cliente.perfil = "ADMIN";
    console.log(cliente.senha)
    clientes.push(cliente);
    localStorage[LS_CHAVE] = JSON.stringify(clientes);
    this.cadastrarUsuario(cliente);
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
}
