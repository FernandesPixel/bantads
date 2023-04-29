import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AutocadastroComponent } from './cliente/autocadastro/autocadastro.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'cliente/cadastro',
    pathMatch: 'full'
  },
  {
    path: 'cliente',
    redirectTo: 'cliente/cadastro'
  },
  {
    path: 'cliente/cadastro',
    component: AutocadastroComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
