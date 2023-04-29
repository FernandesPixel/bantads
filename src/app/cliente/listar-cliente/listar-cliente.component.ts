import { Component, OnInit } from '@angular/core';
import { Cliente } from 'src/app/shared/model/cliente';
import { ClienteServiceService } from '../services/cliente-service.service';

@Component({
  selector: 'app-listar-cliente',
  templateUrl: './listar-cliente.component.html',
  styleUrls: ['./listar-cliente.component.css']
})
export class ListarClienteComponent implements OnInit {
  clientes:Cliente[] = [];

  constructor(private clienteService: ClienteServiceService){}

  ngOnInit():void{
    this.clientes = this.listarTodos();
  }

  listarTodos(): Cliente[]{
    return this.clienteService.listarTodos();
  }
}
