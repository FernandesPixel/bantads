import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

import { Cliente } from 'src/app/shared/model/cliente';
import { ClienteService } from '../services/cliente-service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-editar-cliente',
  templateUrl: './editar-cliente.component.html',
  styleUrls: ['./editar-cliente.component.css']
})
export class EditarClienteComponent {
  @ViewChild('formCliente') formCliente!: NgForm;
  cliente!: Cliente;

  constructor(
    private clienteService: ClienteService,
    private route: ActivatedRoute,
    private router: Router
  ){}

  ngOnInit(): void {
    let id = +this.route.snapshot.params['id'];

    const res = this.clienteService.buscarPorId(id);

    if(res !== undefined){
      this.cliente = res;
    }else{
      throw new Error ("Cliente não encontrado: id = "+id);
    }
  }

  atualizar():void{
    if(this.formCliente.form.valid){
      this.clienteService.atualizar(this.cliente);
      this.router.navigate(['/cliente']);
    }
  }
}
