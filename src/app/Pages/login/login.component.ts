import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-auth',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

  authForm: FormGroup;

  constructor() { }

  ngOnInit() {
    this.authForm = new FormGroup({
      email: new FormControl(null, [
        Validators.required,
        Validators.email,
      ]),
      password: new FormControl(null, Validators.required)
    });
  }

  onSubmit() {
    if (this.authForm.valid) {
      const { email, password } = this.authForm.value;
      // const user = new User(email, password, null, null);
      // this.authService.signin(user)
      //   .subscribe(
      //     this.authService.login,
      //     this.authService.handleError,
      //   );
    }
  }
}
