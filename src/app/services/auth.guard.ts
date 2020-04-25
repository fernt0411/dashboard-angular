import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router
  ) {

  }
  canActivate(
    next: ActivatedRouteSnapshot,// a la pagina q quiere ir o se encuentra
    state: RouterStateSnapshot): Observable<boolean> {
    return this.authService.isAuth().pipe(
      tap(state => {//tap dispara un efecto secundario
        if (!state) { this.router.navigate(['/login']) }
      })
    );
  }

}
