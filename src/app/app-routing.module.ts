import { NgModule } from '@angular/core';
import { RouterModule, Routes, CanActivate } from '@angular/router';

import { AutocadastroComponent } from './cliente/autocadastro/autocadastro.component';
import { ListarClienteComponent } from './cliente/listar-cliente/listar-cliente.component';
import { EditarClienteComponent } from './cliente/editar-cliente/editar-cliente.component';
import { LoginRoutes } from './auth-routin.module';
import { AuthGuard } from './auth/auth.guard';
import { HomeComponent } from './home/home/home.component';
import { HomeClienteComponent } from './cliente/home-cliente/home-cliente.component';
import { ConsultarClienteComponent } from './gerente/consultar-cliente/consultar-cliente.component';
import { ConsultarMelhoresClientesComponent } from './gerente/consultar-melhores-clientes/consultar-melhores-clientes.component';
import { ListarClientesComponent } from './gerente/listar-clientes/listar-clientes.component';
import { TelaInicialComponent } from './gerente/tela-inicial/tela-inicial.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
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
    path: 'cliente/home',
    component: HomeClienteComponent,
    canActivate: [AuthGuard],
    data: {
      role: 'CLIENTE'
    }   
  },
  {
    path: 'cliente/listar',
    component: ListarClienteComponent,
    canActivate: [AuthGuard],
    data: {
      role: 'ADMIN,CLIENTE'
    }    
  },
  {
    path: 'cliente/editar/:id',
    component: EditarClienteComponent,
    canActivate: [AuthGuard],
    data: {
      role: 'CLIENTE'
    }  
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
    path: 'home',
    component: HomeComponent,
    canActivate: [AuthGuard],
    data: {
      role: 'ADMIN,GERENTE,CLIENTE'
    }
  },
  ...LoginRoutes
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
