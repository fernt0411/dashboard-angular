import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';

import { Store } from '@ngrx/store';
import { UserService } from './services/user.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  subscription: Subscription;
  constructor(
    private userService: UserService,
    private store: Store
  ) {

  }
  ngOnInit() {

    this.userService.userListener();
  }
}
