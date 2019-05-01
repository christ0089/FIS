import { Component } from '@angular/core';
import { AuthService } from './Services/auth_service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'TerceraMano';
  isLoggedIn = false;

  constructor(private authService: AuthService) {
    this.authService.getUserStatus().subscribe((result) => {
      if(result && result.uid) {
        this.isLoggedIn = true;
      } else {
        this.isLoggedIn = false;
      }
    });
  }

  fullName() {
    // return this.authService.currentUser.fullName();
  }

  logout() {
    // this.authService.logout();
  }
}
