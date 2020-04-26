import { Injectable } from '@angular/core';

import { AuthFbService } from './fb-services/auth-fb.service';
import { UserFbService } from './fb-services/user-fb.service';
import { Subscription, Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '../app.reducer';
import * as authActions from '../auth/auth.actions';
import { User } from '../models/user.model';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class UserService {
  userSubscription: Subscription;
  constructor(
    public authFbService: AuthFbService,
    public userFbService: UserFbService,
    public store: Store<AppState>
  ) {


  }

  createUser(name: string, email: string, password: string): Promise<any> {

    return this.authFbService.createAuthUser(email, password)
      .then(fbuser => { //usando desustructuracion
        return this.userFbService.createUser(fbuser.user.uid, name, fbuser.user.email);
      });

  }


  userListener() {

    this.authFbService.getStateAuth().subscribe(user => {
      console.log(user);

      if (user) {

        this.userSubscription = this.userFbService.getUser(user.uid).subscribe(fbUser => {

          console.log(fbUser);
          const user = User.fromFireBase(fbUser);
          this.store.dispatch(authActions.setUser({ user: user }))
        });
      } else {
        if(!this.userSubscription){
          this.userSubscription.unsubscribe();
        }
        
        this.store.dispatch(authActions.unSetUser());


      }

    });

    // return this.authFbService.getStateAuth().pipe(map(user => {

    //   if (user) {
    //     this.userSubscription = this.userFbService.getUser(user.uid).subscribe();
    //     return this.userFbService.getUser(user.uid);
    //   } else {
    //     this.userSubscription.unsubscribe();
    //     this.store.dispatch(authActions.unSetUser());
    //   }

    // }))

    //this.authFbService.getStateAuth().subscribe(user => {
    // console.log(user);
    //return this.userFbService.getUser(user.id);
    // return this.userFbService.getUser(user.uid);
    // if (user) {
    //   return this.userFbService.getUser(user.uid)
    //   // this.userSubscription = this.userFbService.getUser(user.uid).subscribe(fbUser => {

    //   //   console.log(fbUser);
    //   //   const user = User.fromFireBase(fbUser);
    //   //   this.store.dispatch(authActions.setUser({ user: user }))
    //   // });
    // } else {
    //   // this.userSubscription.unsubscribe();
    //   // this.store.dispatch(authActions.unSetUser());

    //   return;
    // }

    // });


  }

}
