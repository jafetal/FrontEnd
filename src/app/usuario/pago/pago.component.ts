import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-pago',
  templateUrl: './pago.component.html',
  styleUrls: ['./pago.component.scss']
})
export class PagoComponent implements OnInit {
  usuario: string;
  logged: boolean;
  constructor(public afAuth: AngularFireAuth) { }

  ngOnInit() {
    this.afAuth.authState.subscribe( data => {
      if (data != null){
        this.logged = true;
        this.usuario = data.email;
      }else{
        this.logged = false;
        this.usuario = 'Invitado';
      }
    });
  }

}
