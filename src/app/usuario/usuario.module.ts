import { UsuarioRoutingModule } from './usuario.routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InicioComponent } from './inicio/inicio.component';

@NgModule({
  imports: [
    CommonModule,
    UsuarioRoutingModule
  ],
  declarations: [
    InicioComponent
  ]
})
export class UsuarioModule { }
