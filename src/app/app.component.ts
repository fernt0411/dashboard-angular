import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';
import { auth } from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';

  constructor(private authService: AuthService) {

  }
  ngOnInit() {

    this.authService.getStateAuth().subscribe(user => {
      console.log(user)
    })
  }
}
