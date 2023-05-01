import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth'

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private auth: AngularFireAuth) { }

  login(email: string, pasword: string): Promise<any> {
    return this.auth.signInWithEmailAndPassword(email, pasword);
  }
  
  signup(email: string, password: string): Promise<any> {
    return this.auth.createUserWithEmailAndPassword(email, password);
  }

  isUserLoggedIn(){
    return this.auth.user;
  }

  logout(): Promise<void> {
    return this.auth.signOut();
  }

}
