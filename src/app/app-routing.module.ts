import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {
    path: 'usuario',
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./usuario/usuario.module').then(
            (m) => m.UsuarioModule
          )
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
