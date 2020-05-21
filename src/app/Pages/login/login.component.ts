import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { AuthService } from '../../Services/auth_service';

function validateMail(control: FormControl) {
  if (
    !control.value.includes('@itesm.mx') &&
    !control.value.includes('@tec.mx')
  ) {
    return { invalidEmail: true };
  }
  return null;
}

@Component({
  selector: 'app-auth',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

  authForm: FormGroup;

  constructor(
    private authService: AuthService,
    public snackbar: MatSnackBar,
    private router: Router,
  ) { }

  ngOnInit() {
    this.authForm = new FormGroup({
      email: new FormControl('', [
        Validators.required,
        Validators.email,
        validateMail
      ]),
      password: new FormControl('', Validators.required)
    });
  }

  onSubmit = async () => {
    if (this.authForm.valid) {
      try {
        const credentials = this.authForm.value;
        await this.authService.logIn(credentials);
        this.router.navigate(['/home']);
        this.snackbar.open('Bienvenido de nuevo', 'Cerrar', { duration: 2500 });
      } catch (err) {
        this.snackbar.open(err, 'Cerrar', { duration: 2500 });
      }
    }
  }
}
