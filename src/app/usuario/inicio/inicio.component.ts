import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.scss']
})
export class InicioComponent implements OnInit {
  constructor(public afAuth: AngularFireAuth) { }
  usuario:string;
  logged: boolean;

  ngOnInit() {
    this.afAuth.authState.subscribe( data => {
      if (data != null){
        this.logged = true;
        this.usuario = data.email;
      }else{
        this.logged = false;
      }
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
