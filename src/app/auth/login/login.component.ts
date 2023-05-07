import { Component, ViewChild, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Login } from 'src/app/shared/model/login.model';
import { LoginService } from './../services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
  @ViewChild('formLogin') formLogin! : NgForm;
  login: Login = new Login();
  loading: boolean = false;
  message!: string;

  constructor(
    private loginService: LoginService,
    private router: Router,
    private route: ActivatedRoute
  ){
    if(this.loginService.usuarioLogado){
      this.router.navigate(["cliente"]);
    }
  }

  ngOnInit():void{
    this.route.queryParams
      .subscribe(params => {
        this.message = params['error'];
      })
  }

  public logar():void{
    this.loading = true;
    if(this.formLogin.form.valid){
      this.loginService.login(this.login).subscribe((usu) =>{
        if(usu != null){
          this.loginService.usuarioLogado = usu;
          this.loading = false;
          if(usu.perfil == "CLIENTE"){
            this.router.navigate(['/cliente/home']);
          }else{
            this.router.navigate(['/home']);
          }
        }else{
          this.loading = false;
          this.message = "Usuário/Senha inválidos";
        }
      })
    }else{
      this.loading = false;
    }
  }
}
