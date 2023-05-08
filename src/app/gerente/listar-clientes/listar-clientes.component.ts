import { Component, OnInit} from '@angular/core';
import { Cliente } from 'src/app/shared/model/cliente';
import { GerenteService } from '../services/gerente-service.service';

@Component({
  selector: 'app-listar-clientes',
  templateUrl: './listar-clientes.component.html',
  styleUrls: ['./listar-clientes.component.css']
})

export class ListarClientesComponent{
  clientes: Cliente[] = [];
  filtroNome: string = '';

  constructor(private gerenteService: GerenteService){}

  ngOnInit(): void {
    this.clientes = this.obterClientesAtivos();
  }

  obterClientesAtivos(): Cliente[] {
    return this.gerenteService.obterClientesAtivos();
  }
}
