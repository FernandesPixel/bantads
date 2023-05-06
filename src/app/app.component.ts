import { Usuario } from './shared/model/usuario.model';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from './auth/services/login.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'bantads';

  constructor(
    private router: Router,
    private loginService: LoginService
  ){}

  public get usuarioLogado():Usuario{
    return this.loginService.UsuarioLogado;
  }

  public logout(){
    this.loginService.logout;
    this.router.navigate(['/login']);
  }
}
