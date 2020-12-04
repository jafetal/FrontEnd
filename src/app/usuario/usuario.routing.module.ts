import { ProductoComponent } from './producto/producto.component';
import { ExplorarComponent } from './explorar/explorar.component';
import { InicioComponent } from './inicio/inicio.component';
import { RegistroComponent } from './registro/registro.component';
import { LoginComponent } from './login/login.component';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CategoriaComponent } from './categoria/categoria.component';
import { PagoComponent } from './pago/pago.component';
import { FavoritosComponent } from './favoritos/favoritos.component';
import { CarritoComponent } from './carrito/carrito.component';
import { BusquedaComponent } from './busqueda/busqueda.component';

const routes: Routes = [

    {
      path: '',
      redirectTo: 'inicio',
      pathMatch: 'full'
    },
    {
      path: 'inicio',
      component: InicioComponent,
    },
    {
      path: 'explorar',
      component: ExplorarComponent,
    },
    {
      path: 'login',
      component: LoginComponent,
    },
    {
      path: 'registro',
      component: RegistroComponent,
    },
    {
      path: 'categoria/:nombre',
      component: CategoriaComponent,
    },
    {
      path: 'producto/:key',
      component: ProductoComponent,
    },
    {
      path: 'busqueda/:busqueda',
      component: BusquedaComponent,
    },
    {
      path: 'carrito',
      component: CarritoComponent,
    },
    {
      path: 'favoritos',
      component: FavoritosComponent,
    },
    {
      path: 'pago',
      component: PagoComponent,
    },
  ];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
export class UsuarioRoutingModule{}
