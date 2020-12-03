import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../service/authentication.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

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
