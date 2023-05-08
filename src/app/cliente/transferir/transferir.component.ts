import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Cliente } from 'src/app/shared/model/cliente';
import { ClienteService } from '../services/cliente-service';

@Component({
  selector: 'app-transferir',
  templateUrl: './transferir.component.html',
  styleUrls: ['./transferir.component.css']
})
export class TransferirComponent {
  formulario: FormGroup;
  @Input() cliente: Cliente;
  message!:string;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private clienteService: ClienteService
    ) { 
    this.formulario = this.formBuilder.group({
      quantia: [null, [Validators.required, Validators.minLength(1), Validators.maxLength(200)]],
      contaId: [null, [Validators.required, Validators.minLength(1), Validators.maxLength(200)]]
    });
    this.cliente = new Cliente();
  }

  ngOnInit():void{
    let id = +this.route.snapshot.params['id'];

    const res = this.clienteService.buscarPorId(id);

    if(res !== undefined){
      this.cliente = res;
      this.formulario.setValue(this.cliente);
    }
  }

  onSubmit(){
    if(this.formulario.valid){
      let quantia = this.formulario.get('quantia')?.value;
      let contaId = this.formulario.get('contaId')?.value;
      console.log("contaId"+contaId);
      let contaCreditada = this.clienteService.buscarConta(contaId);
      if(contaCreditada){
        this.clienteService.transferir(this.cliente.conta, contaCreditada, quantia);
        this.router.navigate(["/cliente/home"]);
      }else{
        this.message = "A conta número: "+contaId+" não existe!";
      }
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
}
