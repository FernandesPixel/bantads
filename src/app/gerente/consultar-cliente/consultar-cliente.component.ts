import { Component } from '@angular/core';
import { Cliente } from 'src/app/shared/model/cliente';
import { GerenteService } from '../services/gerente-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ClienteService } from 'src/app/cliente/services/cliente-service';

@Component({
  selector: 'app-consultar-cliente',
  templateUrl: './consultar-cliente.component.html',
  styleUrls: ['./consultar-cliente.component.css']
})
export class ConsultarClienteComponent {
  cliente: Cliente = new Cliente();
  filtroNome: string = '';
  message!:string;

  constructor(
    private gerenteService: GerenteService,
    private router: Router,
    private route: ActivatedRoute,
    private clienteService: ClienteService
    ){}

  ngOnInit(): void {
    let id = +this.route.snapshot.params['id'];

    const res = this.clienteService.buscarPorId(id);

    if(res !== undefined){
      this.cliente = res;
    }else{
      this.message = "Cliente não encontrado: id = "+id;
    }
  }

  obterClientesAtivos(): Cliente[] {
    return this.gerenteService.obterClientesAtivos();
  }
}
