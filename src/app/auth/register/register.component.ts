import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import Swal from 'sweetalert2'
import { Store } from '@ngrx/store';
import { AppState } from '../../app.reducer';
import * as uiActions from '../../shared/ui.actions';
import { Subscription } from 'rxjs';
import { UserService } from '../../services/user.service';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: []
})
export class RegisterComponent implements OnInit, OnDestroy {

  registerForm: FormGroup;

  isLoading: boolean = false;


  uiSubscription: Subscription;
  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router,
    private store: Store<AppState>
  ) { }


  ngOnDestroy(): void {
    this.uiSubscription.unsubscribe();
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
    this.registerForm = this.fb.group(
      {
        name: ['', Validators.compose([
          Validators.required

        ])],
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

  onCreateUser() {
    // Swal.fire({
    //   title: 'cargando',
    //   onBeforeOpen: () => {
    //     Swal.showLoading()
    //   }
    // });
    if (this.registerForm.invalid) { return; };
    this.store.dispatch(uiActions.isLoading());
    //usando destructuracion de objetos
    const { name, email, password } = this.registerForm.value;
    this.userService.createUser(name, email, password)
      .then(fbUser => {

        this.userService

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
    return this.registerForm.get(controlName);
  }

}
