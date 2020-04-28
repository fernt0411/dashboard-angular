import { Injectable } from '@angular/core';

import { AuthFbService } from './fb-services/auth-fb.service';
import { UserFbService } from './fb-services/user-fb.service';
import { Subscription, Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '../app.reducer';
import * as authActions from '../auth/auth.actions';
import { User } from '../models/user.model';
import { map } from 'rxjs/operators';
import * as incomeExpenseActions from '../ingreso-egreso/income-expense.actions';
@Injectable({
  providedIn: 'root'
})
export class UserService {
  userSubscription: Subscription;
  private _user: User;
  constructor(
    public authFbService: AuthFbService,
    public userFbService: UserFbService,
    public store: Store<AppState>
  ) {


  }

  get user() {
    return { ... this._user };
  }
  createUser(name: string, email: string, password: string): Promise<any> {

    return this.authFbService.createAuthUser(email, password)
      .then(fbuser => { //usando desustructuracion
        return this.userFbService.createUser(fbuser.user.uid, name, fbuser.user.email);
      });

  }


  userListener() {

    this.authFbService.getStateAuth().subscribe(user => {
      //console.log(user);

      if (user) {

        this.userSubscription = this.userFbService.getUser(user.uid).subscribe(fbUser => {


          const user = User.fromFireBase(fbUser);
          this._user = user;

          this.store.dispatch(authActions.setUser({ user: user }));

        });
      } else {
        this._user = null;
        this.store.dispatch(authActions.unSetUser());
        this.store.dispatch(incomeExpenseActions.unSetItems())
        if (this.userSubscription) {
          this.userSubscription.unsubscribe();
        }



      }

    });




  }

}
