import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router, CanLoad } from '@angular/router';
import { Observable } from 'rxjs';
import { tap, take } from 'rxjs/operators';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanLoad {
  constructor(
    private authService: AuthService,
    private router: Router
  ) {

  }
  canLoad(): Observable<boolean> {
    return this.authService.isAuth().pipe(
      tap(state => {//tap dispara un efecto secundario
        if (!state) { this.router.navigate(['/login']) }
      }), take(1)//cuando se resuelve la primera vez se cancela la subscripcion
    );
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
