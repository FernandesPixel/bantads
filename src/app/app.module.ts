import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ClienteModule } from './cliente/cliente.module';
import { TelaInicialComponent } from './gerente/tela-inicial/tela-inicial.component';
import { ListarClientesComponent } from './gerente/listar-clientes/listar-clientes.component';
import { ConsultarClienteComponent } from './gerente/consultar-cliente/consultar-cliente.component';
import { ConsultarMelhoresClientesComponent } from './gerente/consultar-melhores-clientes/consultar-melhores-clientes.component';

@NgModule({
  declarations: [
    AppComponent,
    TelaInicialComponent,
    ListarClientesComponent,
    ConsultarClienteComponent,
    ConsultarMelhoresClientesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ClienteModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
