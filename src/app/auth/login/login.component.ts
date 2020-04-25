import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2'
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: []
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
    this.buildForm();
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
    Swal.fire({
      title: 'cargando',
      onBeforeOpen: () => {
        Swal.showLoading()
      }
    });
    if (this.loginForm.invalid) { return; };
    //usando destructuracion de objetos
    const { email, password } = this.loginForm.value;

    console.log(this.loginForm.value)
    this.authService.login(email, password)
      .then(credentials => {
        Swal.close();
        console.log(credentials);
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
