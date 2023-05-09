import { Component, OnInit } from '@angular/core';

import { Cliente } from 'src/app/shared/model/cliente';
import { LoginService } from 'src/app/auth/services/login.service';
import { ClienteService } from '../services/cliente-service';
import { ActivatedRoute, Router } from '@angular/router';
import { Extrato } from 'src/app/shared/extrato';
import { Operacao } from 'src/app/shared/operacao.enum';
import { Transferencia } from 'src/app/shared/transferencia';



@Component({
  selector: 'app-extrato',
  templateUrl: './extrato.component.html',
  styleUrls: ['./extrato.component.css']
})
export class ExtratoComponent implements OnInit{
  cliente:Cliente = new Cliente();
  extratos:Extrato[] =[];
  operacao = Operacao;
  extratosTransferencias:Transferencia[] = [];

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
        this.extratos = cliente.conta.extratos;
        if(this.cliente.id){
          this.extratosTransferencias = this.clienteService.buscarTransferencias(this.cliente.id);
        }
      }
    }
  }
}
