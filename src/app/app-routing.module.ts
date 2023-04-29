import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AutocadastroComponent } from './cliente/autocadastro/autocadastro.component';
import { ListarClienteComponent } from './cliente/listar-cliente/listar-cliente.component';

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
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
