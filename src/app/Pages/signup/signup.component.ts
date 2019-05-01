import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../Services/auth_service';
import {
  FormGroup,
  FormControl,
  Validators
} from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';

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
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  signupForm: FormGroup;

  constructor(
    private authService: AuthService,
    public snackbar: MatSnackBar,
    private router: Router,
  ) {}

  ngOnInit() {
    this.signupForm = new FormGroup({
      firstName: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      email: new FormControl('', [
        Validators.required,
        Validators.email,
        validateMail
      ]),
      password: new FormControl('', Validators.required),
      password2: new FormControl('', Validators.required)
    });
  }

  onSubmit = async () => {
    const userData = this.signupForm.value;
    const { password, password2 } = userData;
      if (this.signupForm.valid) {
        if (password === password2) {
          try {
            await this.authService.signUp(userData);
            this.router.navigate(['/']);
          } catch (err) {
            this.snackbar.open(err, 'Cerrar', { duration: 2500 });
          }
        } else {
          this.snackbar.open('Las contraseñas no coinciden', 'Cerrar', { duration: 2500 });
        }
      }
  }
}
