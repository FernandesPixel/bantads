import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ConsultarClienteComponent } from './gerente/consultar-cliente/consultar-cliente.component';
import { ConsultarMelhoresClientesComponent } from './gerente/consultar-melhores-clientes/consultar-melhores-clientes.component';
import { ListarClientesComponent } from './gerente/listar-clientes/listar-clientes.component';
import { TelaInicialComponent } from './gerente/tela-inicial/tela-inicial.component';

@NgModule({
  declarations: [
    ConsultarClienteComponent,
    ConsultarMelhoresClientesComponent,
    ListarClientesComponent,
    TelaInicialComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule
  ]
})
export class GerenteModule { }
