import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2'
import { Store } from '@ngrx/store';

import { AppState } from '../../app.reducer';
import * as uiActions from '../../shared/ui.actions';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: []
})
export class LoginComponent implements OnInit, OnDestroy {

  loginForm: FormGroup;
  isLoading: boolean = false;

  uiSubscription: Subscription;
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private store: Store<AppState>
  ) { }


  ngOnDestroy(): void {
    this.uiSubscription.unsubscribe()

  }

  ngOnInit() {
    this.storeSubscribe();
    this.buildForm();
  }

  storeSubscribe() {
    this.uiSubscription = this.store.select('ui').subscribe(ui => {
      this.isLoading = ui.isLoading;
    });
  }

  buildForm() {
    this.loginForm = this.fb.group(
      {

        email: ['', Validators.compose([
          Validators.required,
          Validators.email

        ])],
        password: ['', Validators.compose([
          Validators.required

        ])]

      }
    )
  }

  onLogin() {
    // Swal.fire({
    //   title: 'cargando',
    //   onBeforeOpen: () => {
    //     Swal.showLoading()
    //   }
    // });
    if (this.loginForm.invalid) { return; };
    //usando destructuracion de objetos

    this.store.dispatch(uiActions.isLoading());


    const { email, password } = this.loginForm.value;


    this.authService.login(email, password)
      .then(credentials => {
        // Swal.close();
        //console.log(credentials);

        this.store.dispatch(uiActions.stopLoading());
        this.router.navigate(['/'])
      })
      .catch(err => {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: err.message,
          footer: '<a href>Why do I have this issue?</a>'
        })
      });
  }

  getFormControl(controlName) {
    return this.loginForm.get(controlName);
  }
}
