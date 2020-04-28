import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AppState } from '../../app.reducer';
import { Store } from '@ngrx/store';
import { filter } from 'rxjs/operators';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: []
})
export class SidebarComponent implements OnInit {
  subscriptionStore: Subscription;
  user: User;
  constructor(
    private authService: AuthService,
    private router: Router,
    private store: Store<AppState>
  ) { }

  ngOnInit() {
    this.storeSubscribe();

  }

  ngOnDestroy() {
    this.subscriptionStore.unsubscribe();

  }

  storeSubscribe() {
    this.subscriptionStore = this.store.select('user')
      .pipe(
        filter(({ user }) => user != null)
      )
      .subscribe(({ user }) => {
        this.user = user;
      });
  }
  onLogout() {
    Swal.fire({
      title: 'cargando',
      onBeforeOpen: () => {
        Swal.showLoading()
      }
    });
    this.authService.logout().then(
      val => {
        Swal.close()
        this.router.navigate(['/login'])
      }
    ).catch(
      err => {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: err.message,
          footer: '<a href>Why do I have this issue?</a>'
        })
      });

  }


}
