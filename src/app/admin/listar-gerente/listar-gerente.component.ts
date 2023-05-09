import { Component, OnInit } from '@angular/core';
import { AdminService } from '../services/admin.service';

import { Gerente } from 'src/app/shared/model/gerente';

@Component({
  selector: 'app-listar-gerente',
  templateUrl: './listar-gerente.component.html',
  styleUrls: ['./listar-gerente.component.css']
})
export class ListarGerenteComponent implements OnInit {

  gerentes: Gerente[] = [];

  constructor(private adminService: AdminService){}

  ngOnInit(): void {
    this.gerentes = this.listarTodos();
  }

  listarTodos(): Gerente[] {
    return this.adminService.listarTodos();
  }

  excluir($event: any, gerente: Gerente): void {
    $event.preventDefault();
    if(confirm(`Deseja realmente excluir o gerente ${gerente.nome}?`)) {
      this.adminService.remover(gerente.id!);
      this.gerentes = this.listarTodos();
    }
  }
}
