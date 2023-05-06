import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { Usuario } from 'src/app/shared/model/usuario.model';
import { Login } from './../../shared/model/login.model';
import { ClienteService } from 'src/app/cliente/services/cliente-service';

const LS_CHAVE: string = "usuairoLogado";

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(
    private clienteService: ClienteService
  ){}

  public get UsuarioLogado():Usuario{
    let usu = localStorage[LS_CHAVE];
    return (usu ? JSON.parse(localStorage[LS_CHAVE]):null);
  }

  public set usuarioLogado(usuario:Usuario){
    localStorage[LS_CHAVE] = JSON.stringify(usuario);
  }

  public logout(){
    delete localStorage[LS_CHAVE];
  }

  public login(login:Login): Observable<Usuario | null>{

    if(login.login && login.senha){
      return of(this.clienteService.buscarUsuario(login.login, login.senha));
    }
    return of(null);
    
    // let usu = new Usuario(1, "Juan-Func", login.login, login.senha, "FUNC");
    // if(login.login == login.senha){
    //   if(login.login=="admin"){
    //     usu = new Usuario(1, "Juan-Admin", login.login, login.senha, "ADMIN" );
    //   }else if(login.login=="gerente"){
    //     usu = new Usuario(1, "Juan-Gerente", login.login, login.senha, "GERENTE" );
    //   }
    //   return of(usu);
    // }else{
    //   return of(null);
    // }

  }


}
