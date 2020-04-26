import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';

import { Observable } from 'rxjs';

import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class AuthFbService {

  constructor(
    public angularFireAuth: AngularFireAuth

  ) {

  }
  createAuthUser(email: string, password: string): Promise<any> {

    return this.angularFireAuth.createUserWithEmailAndPassword(email, password);
  }

  login(email: string, password: string): Promise<any> {
    return this.angularFireAuth.signInWithEmailAndPassword(email, password);
  }

  logout(): Promise<any> {
    return this.angularFireAuth.signOut();
  }

  getStateAuth(): Observable<any> {
    return this.angularFireAuth.authState;
  }
  isAuth(): Observable<any> {
    return this.angularFireAuth.authState.pipe(
      map(fbUser => fbUser != null)//mutamos la respues con map toma la info y retorno lo q quieras
    );
  }
}
