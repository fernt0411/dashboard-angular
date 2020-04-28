import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
;
import { User } from '../../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserFbService {

  constructor(
    private angularFirestore: AngularFirestore
  ) {


  }

  createUser(uid: string, name: string, email: string): Promise<any> {
    const user = new User(uid, name, email);
    return this.angularFirestore.doc(`${user.uid}/user`).set({ ...user }) //usamos la desutructuracion;
  }
  getUser(uid: string): Observable<any> {
    return this.angularFirestore.doc(`${uid}/user`).valueChanges();
  }
}