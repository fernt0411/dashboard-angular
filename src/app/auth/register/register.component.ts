import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: []
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
    this.buildForm();
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
    Swal.fire({
      title: 'cargando',
      onBeforeOpen: () => {
        Swal.showLoading()
      }
    });
    if (this.registerForm.invalid) { return; };
    //usando destructuracion de objetos
    const { name, email, password } = this.registerForm.value;
    this.authService.createUser(name, email, password)
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
    return this.registerForm.get(controlName);
  }

}
