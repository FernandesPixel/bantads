import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AutocadastroComponent } from './cliente/autocadastro/autocadastro.component';
import { ListarClienteComponent } from './cliente/listar-cliente/listar-cliente.component';
import { EditarClienteComponent } from './cliente/editar-cliente/editar-cliente.component';

import { ConsultarClienteComponent } from './gerente/consultar-cliente/consultar-cliente.component';
import { ConsultarMelhoresClientesComponent } from './gerente/consultar-melhores-clientes/consultar-melhores-clientes.component';
import { ListarClientesComponent } from './gerente/listar-clientes/listar-clientes.component';
import { TelaInicialComponent } from './gerente/tela-inicial/tela-inicial.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'cliente/listar',
    pathMatch: 'full'
  },
  {
    path: 'cliente',
    redirectTo: 'cliente/listar'
  },
  {
    path: 'cliente/cadastro',
    component: AutocadastroComponent
  },
  {
    path: 'cliente/listar',
    component: ListarClienteComponent
  },
  {
    path: 'cliente/editar/:id',
    component: EditarClienteComponent
  },
  {
    path: 'gerente',
    component: TelaInicialComponent
  },
  {
    path: 'gerente/consultar-cliente/:id',
    component: ConsultarClienteComponent
  },
  {
    path: 'gerente/consultar-melhores-clientes',
    component: ConsultarMelhoresClientesComponent
  },
  {
    path: 'gerente/listar-clientes',
    component: ListarClientesComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
