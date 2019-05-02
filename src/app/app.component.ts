import { Component } from '@angular/core';
import { AuthService } from './Services/auth_service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  userId: string;

  constructor(
    public authService: AuthService,
    public router: Router,
    public snackbar: MatSnackBar,
    ) {
      this.authService.getUserData().subscribe(user => {
        if (user && user.uid) {
          this.userId = user.uid;
        }
      });
    }

  logOut() {
    this.authService.logOut();
    this.snackbar.open('Sesión finalizada', 'Cerrar', { duration: 2500 });
    this.router.navigate(['/']);
  }
}
