import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Categoria } from 'src/app/model/categoria';

@Component({
  selector: 'app-categoria',
  templateUrl: './categoria.component.html',
  styleUrls: ['./categoria.component.css']
})
export class CategoriaComponent implements OnInit {
  categoria: string;
  usuario: string;
  logged: boolean;

  constructor(private route: ActivatedRoute,
              public afAuth: AngularFireAuth) { }

  ngOnInit(){
    this.afAuth.authState.subscribe( data => {
      if (data != null){
        this.logged = true;
        this.usuario = data.email;
      }else{
        this.logged = false;
      }
    });

    this.route.params.subscribe(params => {
      this.categoria = params['nombre'];
      console.log(this.categoria);
    });
  }

}
