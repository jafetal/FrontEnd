import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})

export class AuthenticationService {

  constructor(
    public afAuth: AngularFireAuth, // Inject Firebase auth service
    public router: Router
  ) {}

  // Sign up with email/password
  // tslint:disable-next-line: typedef
  SignUp(email, password) {
    return this.afAuth.createUserWithEmailAndPassword(email, password)
      .then((result) => {
        window.alert('Te haz registrado correctamente');
        this.router.navigate(['usuario']);
      }).catch((error) => {
        window.alert(error.message);
      })
  }

  // Sign in with email/password
  // tslint:disable-next-line: typedef
  SignIn(email, password) {
    return this.afAuth.signInWithEmailAndPassword(email, password)
      .then((result) => {
         this.router.navigate(['usuario']);
      }).catch((error) => {
        window.alert(error.message);
      })
  }

}
