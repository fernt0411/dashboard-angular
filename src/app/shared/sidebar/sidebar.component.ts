import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: []
})
export class SidebarComponent implements OnInit {

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
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
