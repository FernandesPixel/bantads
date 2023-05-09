import { Component } from '@angular/core';
import { Cliente } from 'src/app/shared/model/cliente';
import { GerenteService } from '../services/gerente-service.service';

@Component({
  selector: 'app-consultar-melhores-clientes',
  templateUrl: './consultar-melhores-clientes.component.html',
  styleUrls: ['./consultar-melhores-clientes.component.css']
})
export class ConsultarMelhoresClientesComponent {
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
