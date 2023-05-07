import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AutocadastroComponent } from './cliente/autocadastro/autocadastro.component';
import { ListarClienteComponent } from './cliente/listar-cliente/listar-cliente.component';
import { EditarClienteComponent } from './cliente/editar-cliente/editar-cliente.component';

import { ConsultarClienteComponent } from './gerente/consultar-cliente/consultar-cliente.component';
import { ConsultarMelhoresClientesComponent } from './gerente/consultar-melhores-clientes/consultar-melhores-clientes.component';
import { ListarClientesComponent } from './gerente/listar-clientes/listar-clientes.component';
import { TelaInicialComponent } from './gerente/tela-inicial/tela-inicial.component';

import { ListarGerenteComponent } from './admin/listar-gerente/listar-gerente.component';
import { InserirGerenteComponent } from './admin/inserir-gerente/inserir-gerente.component';
import { EditarGerenteComponent } from './admin/editar-gerente/editar-gerente.component';
import { RelatorioClienteComponent } from './admin/relatorio-cliente/relatorio-cliente.component';

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
    path: 'gerente/consultar-cliente',
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
  {
    path: 'admin',
    component: ListarGerenteComponent
  },
  {
    path: 'admin/novo',
    component: InserirGerenteComponent
  },
  {
    path: 'admin/editar/:id',
    component: EditarGerenteComponent
  },
  {
    path: 'admin/relatorio',
    component: RelatorioClienteComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
