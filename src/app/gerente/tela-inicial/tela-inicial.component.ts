import { Component, OnInit} from '@angular/core';
import { Cliente } from 'src/app/shared/model/cliente';
import { GerenteService } from '../services/gerente-service.service';

@Component({
  selector: 'app-tela-inicial',
  templateUrl: './tela-inicial.component.html',
  styleUrls: ['./tela-inicial.component.css']
})
export class TelaInicialComponent {
  clientes:Cliente[] = [];

  constructor(private gerenteService: GerenteService){}

  ngOnInit():void{
    this.clientes = this.obterClientesPendentes();
  }

  obterClientesPendentes(): Cliente[]{
    return this.gerenteService.obterClientesPendentes();
  }

  aprovarCliente($event: any, cliente:Cliente): void{
    $event.preventDefault();
      this.gerenteService.aprovarCliente(cliente);
      this.clientes = this.obterClientesPendentes(); 
  }

  recusarCliente($event: any, cliente:Cliente, motivo:string): void{
    $event.preventDefault();
      this.gerenteService.recusarCliente(cliente, motivo);
      this.clientes = this.obterClientesPendentes(); 
  }
}



