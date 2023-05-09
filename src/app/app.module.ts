import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { DEFAULT_CURRENCY_CODE, LOCALE_ID} from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ClienteModule } from './cliente/cliente.module';
import { TelaInicialComponent } from './gerente/tela-inicial/tela-inicial.component';
import { ListarClientesComponent } from './gerente/listar-clientes/listar-clientes.component';
import { ConsultarClienteComponent } from './gerente/consultar-cliente/consultar-cliente.component';
import { ConsultarMelhoresClientesComponent } from './gerente/consultar-melhores-clientes/consultar-melhores-clientes.component';
import { AuthModule } from './auth/auth.module';

import ptBr from '@angular/common/locales/pt';
import { registerLocaleData } from '@angular/common';

registerLocaleData(ptBr);

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
    ClienteModule,
    AuthModule
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'pt' },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
