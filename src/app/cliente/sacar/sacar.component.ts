import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Cliente } from 'src/app/shared/model/cliente';
import { ClienteService } from '../services/cliente-service';

@Component({
  selector: 'app-sacar',
  templateUrl: './sacar.component.html',
  styleUrls: ['./sacar.component.css']
})
export class SacarComponent implements OnInit{

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
      quantia: [null, [Validators.required, Validators.minLength(1), Validators.maxLength(200)]]
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
      console.log(quantia);
      if(this.clienteService.sacar(this.cliente,quantia)){
        this.router.navigate(['/cliente/home']);
      }
      this.message = "A quantia é maior que o saldo + limite."
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
