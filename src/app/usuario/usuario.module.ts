import { FooterComponent } from './footer/footer.component';
import { ExplorarComponent } from './explorar/explorar.component';
import { RegistroComponent } from './registro/registro.component';
import { LoginComponent } from './login/login.component';
import { UsuarioRoutingModule } from './usuario.routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InicioComponent } from './inicio/inicio.component';
import { NgxPaginationModule } from 'ngx-pagination';


@NgModule({
  imports: [
    CommonModule,
    UsuarioRoutingModule,
    NgxPaginationModule
  ],
  declarations: [
    InicioComponent,
    LoginComponent,
    RegistroComponent,
    ExplorarComponent,
    FooterComponent
  ]
})
export class UsuarioModule { }
