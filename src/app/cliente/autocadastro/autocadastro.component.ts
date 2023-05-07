import { Component, OnInit} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { Cliente } from 'src/app/shared/model/cliente';
import { ClienteService } from '../services/cliente-service';
import { LoginService } from 'src/app/auth/services/login.service';
import { Login } from 'src/app/shared/model/login.model';

@Component({
  selector: 'app-autocadastro',
  templateUrl: './autocadastro.component.html',
  styleUrls: ['./autocadastro.component.css']
})
export class AutocadastroComponent implements OnInit{

formulario: FormGroup;
cliente: Cliente;
message!: string;

constructor(
  private formBuilder: FormBuilder,
  private router: Router,
  private clienteService: ClienteService,
  private loginService: LoginService
  ) { 
    this.formulario = this.formBuilder.group({
      nome: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(200)]],
      email: [null, [Validators.required, Validators.email]],
      cpf: [null, [Validators.required]],
      salario: [null, [Validators.required]],
      endereco: this.formBuilder.group({
        cep: [null, [Validators.required]],
        numero: [null, [Validators.required]],
        complemento: [null],
        rua: [null, [Validators.required]],
        bairro: [null, [Validators.required]],
        cidade: [null, [Validators.required]],
        estado: [null, [Validators.required]]
      })
    });

    this.cliente = new Cliente();
  }

  ngOnInit():void{
  }

  onSubmit(){
    if(this.formulario.valid){
      this.cliente = this.formulario.value as Cliente;
      console.log(this.cliente.salario);
      this.cadastrar(this.cliente);
    }
  }

  aplicaCssErro(campo: string){
    return {
      'has-error': this.verificaValidTouched(campo),
      'has-feedback': this.verificaValidTouched(campo)
    }
  }

  verificaValidTouched(campo: string): boolean {
    const campoControl = this.formulario.get(campo);
    return campoControl ? !campoControl.valid && campoControl.touched : false;
  }

  verificaEmailInvalido(){
    let campoEmail = this.formulario.get('email'); 
    if(campoEmail?.errors){
      return campoEmail?.errors['email'] && campoEmail.touched;
    }
  }

  cadastrar(cliente :Cliente):void{
    if(this.clienteService.clienteValido(cliente)){
      this.clienteService.cadastrar(cliente);
      this.message = "Solicitação de abertura de conta enviada!"
      this.loginService.login(new Login(cliente.login,cliente.senha));
      this.router.navigate(["/cliente/home"]);
    }else{
      this.message = "Cada cliente só pode ter uma conta no BANTADS"
      this.router.navigate(["/cliente/cadastro"]);
    }
  }

}