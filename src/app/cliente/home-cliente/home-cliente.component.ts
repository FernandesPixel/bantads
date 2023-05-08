import { Component, OnInit } from '@angular/core';

import { Cliente } from 'src/app/shared/model/cliente';
import { LoginService } from 'src/app/auth/services/login.service';
import { ClienteService } from '../services/cliente-service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-home-cliente',
  templateUrl: './home-cliente.component.html',
  styleUrls: ['./home-cliente.component.css']
})
export class HomeClienteComponent implements OnInit{
  cliente:Cliente = new Cliente();

  constructor(
    private loginService: LoginService,
    private clienteService: ClienteService,
    private router: Router,
    private route: ActivatedRoute
  ){}

  ngOnInit(): void {
    let usuario = this.loginService.UsuarioLogado;
    const clienteId = usuario?.id;
    if (clienteId !== undefined) {
      const cliente = this.clienteService.buscarPorId(clienteId);
      if(cliente){
        this.cliente = cliente;
      }
    }
  }

}
