import { Component, OnInit} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { Cliente } from 'src/app/shared/model/cliente';
import { ClienteService } from '../services/cliente-service';
import { Usuario } from 'src/app/shared/model/usuario.model';

@Component({
  selector: 'app-editar-cliente',
  templateUrl: './editar-cliente.component.html',
  styleUrls: ['./editar-cliente.component.css']
})
export class EditarClienteComponent {
  formulario: FormGroup;
  cliente: Cliente;
  message!: string;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private clienteService: ClienteService
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

  ngOnInit(): void {
    let id = +this.route.snapshot.params['id'];

    const res = this.clienteService.buscarPorId(id);

    if(res !== undefined){
      this.cliente = res;
      this.formulario.setValue(this.cliente);
    }else{
      this.message = "Cliente não encontrado: id = "+id;
    }
  }

  onSubmit(){
    if(this.formulario.valid){
      let usuario = new Usuario(this.cliente.id, this.cliente.nome, this.cliente.login, this.cliente.senha, this.cliente.perfil);
      this.cliente = this.formulario.value as Cliente;
      this.cliente.id = usuario.id;
      this.cliente.login = this.cliente.email;
      this.cliente.senha = usuario.senha;
      this.cliente.perfil = usuario.perfil;

      this.atualizar(this.cliente);
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

  atualizar(cliente:Cliente):void{
    this.clienteService.atualizar(cliente);
    this.router.navigate(['/cliente']);
  }
}
