import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AutocadastroComponent } from './autocadastro/autocadastro.component';
import { RouterModule } from '@angular/router';
import { ListarClienteComponent } from './listar-cliente/listar-cliente.component';
import { EditarClienteComponent } from './editar-cliente/editar-cliente.component';
import { CampoControlErroComponent } from '../campo-control-erro/campo-control-erro.component';
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from 'ngx-mask';
import { HomeClienteComponent } from './home-cliente/home-cliente.component';
import { AuthModule } from '../auth/auth.module';
import { DepositarComponent } from './depositar/depositar.component';
import { SacarComponent } from './sacar/sacar.component';
import { TransferirComponent } from './transferir/transferir.component';
import { ExtratoComponent } from './extrato/extrato.component';

@NgModule({
  declarations: [
    AutocadastroComponent,
    ListarClienteComponent,
    EditarClienteComponent,
    CampoControlErroComponent,
    HomeClienteComponent,
    DepositarComponent,
    SacarComponent,
    TransferirComponent,
    ExtratoComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule,
    NgxMaskDirective, 
    NgxMaskPipe,
    AuthModule
  ],
  providers: [provideNgxMask()]
})
export class ClienteModule { }
