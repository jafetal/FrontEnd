import { Router } from '@angular/router';
import { CategoriaService } from './../../service/categoria.service';
import { Categoria } from './../../model/categoria';
import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  usuario: string;
  logged: boolean;
  public buscar: string;
  categoriaList: Categoria[];
  constructor(public afAuth: AngularFireAuth,

              private categoriaService: CategoriaService,
              private router: Router) { }

  ngOnInit() {
    this.afAuth.authState.subscribe( data => {
      if (data != null){
        this.logged = true;
        this.usuario = data.email;
      }else{
        this.logged = false;
      }
    });

    this.categoriaService.getCategorias()
      .snapshotChanges().subscribe(item => {
        this.categoriaList = [];
        item.forEach(element => {
          let x = element.payload.toJSON();
          x['$key'] = element.key;
          this.categoriaList.push(x as Categoria);
        });
      });
  }

  signOut(){
    this.afAuth.authState.subscribe( data => {
      if (data != null){
        this.afAuth.signOut();
      }
    });
  }

}
