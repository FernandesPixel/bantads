import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminService } from './services/admin.service';
import { ListarGerenteComponent } from './listar-gerente/listar-gerente.component';

import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { InserirGerenteComponent } from './inserir-gerente/inserir-gerente.component';
import { EditarGerenteComponent } from './editar-gerente/editar-gerente.component';
import { RelatorioClienteComponent } from './relatorio-cliente/relatorio-cliente.component';



@NgModule({
  declarations: [
    ListarGerenteComponent,
    InserirGerenteComponent,
    EditarGerenteComponent,
    RelatorioClienteComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule
  ],
  providers: [
    AdminService  
  ]
})
export class AdminModule { }
