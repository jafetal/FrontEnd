import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../service/authentication.service';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.scss']
})
export class RegistroComponent implements OnInit {

  constructor(public authenticationService: AuthenticationService,
    public afAuth: AngularFireAuth,
    public router: Router) { }

  ngOnInit() {
    this.afAuth.authState.subscribe( data => {
      if (data != null){
        this.router.navigate(['usuario']);
      }
    });
  }

}
