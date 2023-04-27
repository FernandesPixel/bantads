import { Component, OnInit, ViewChild} from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import { Cliente } from 'src/app/shared/model/cliente';
import { ClienteServiceService } from '../services/cliente-service.service';



@Component({
  selector: 'app-autocadastro',
  templateUrl: './autocadastro.component.html',
  styleUrls: ['./autocadastro.component.css']
})
export class AutocadastroComponent implements OnInit{
  @ViewChild('formCliente') formCliente! : NgForm;
  cliente! :Cliente;

  constructor(
    private clienteService: ClienteServiceService,
    private router: Router
  ){}

  ngOnInit():void{
    this.cliente = new Cliente();
  }

  cadastrar():void{
    if(this.formCliente.valid){
      this.clienteService.cadastrar(this.cliente);
      this.router.navigate(["/cliente"]);
    }
  }

}