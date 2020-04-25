import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

import { map } from 'rxjs/operators';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    public angularFireAuth: AngularFireAuth,
    private angularFirestore: AngularFirestore
  ) {


  }

  createUser(name: string, email: string, password: string): Promise<any> {


    return this.angularFireAuth.createUserWithEmailAndPassword(email, password)
      .then(fbuser => { //usando desustructuracion
        const user = new User(fbuser.user.uid, name, fbuser.user.email);
        return this.angularFirestore.doc(`${user.uid}/user`).set({...user}) //usamos la desutructuracion;
      });

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
