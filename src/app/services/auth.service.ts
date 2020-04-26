import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthFbService } from './fb-services/auth-fb.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private authFbService: AuthFbService

  ) {

  }


  login(email: string, password: string): Promise<any> {
    return this.authFbService.login(email, password);

  }

  logout(): Promise<any> {
    return this.authFbService.logout();
  }

  getStateAuth(): Observable<any> {
    return this.authFbService.getStateAuth();
  }

  isAuth(): Observable<any> {

    return this.authFbService.isAuth();
  }
}
