import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AutocadastroComponent } from './autocadastro/autocadastro.component';
import { RouterModule } from '@angular/router';
import { ListarClienteComponent } from './listar-cliente/listar-cliente.component';
import { EditarClienteComponent } from './editar-cliente/editar-cliente.component';
import { CampoControlErroComponent } from '../campo-control-erro/campo-control-erro.component';


@NgModule({
  declarations: [
    AutocadastroComponent,
    ListarClienteComponent,
    EditarClienteComponent,
    CampoControlErroComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule
  ]
})
export class ClienteModule { }
