import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../Services/auth_service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { ProductService } from 'src/app/Services/productService';
import { Observable } from 'rxjs';
import { Product } from 'src/app/Class /Product';
import { CurrencyPipe } from '@angular/common';

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
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  profileForm: FormGroup;
  products$: Observable<Product[]>;
  constructor(
    private authService: AuthService,
    private productService: ProductService,
    public snackbar: MatSnackBar
  ) {}

  ngOnInit() {
    this.profileForm = new FormGroup({
      firstName: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      cellPhone: new FormControl('', Validators.required),
      photoUrl: new FormControl('', Validators.required),
      email: new FormControl('', [
        Validators.required,
        Validators.email,
        validateMail
      ])
    });
    this.products$ = this.productService.getProducts('owner', this.authService.getCurrentUser().uid);
  }

  onSubmit = async () => {
    const {
      email,
      firstName,
      lastName,
      cellPhone,
      photoUrl
    } = this.profileForm.value;
    if (this.profileForm.valid) {
      try {
        const currentUser = this.authService.getCurrentUser();
        const displayName = `${firstName} ${lastName}`;
        currentUser.updateEmail(email);
        currentUser.updatePhoneNumber(cellPhone);
        currentUser.updateProfile({
          photoURL: photoUrl,
          displayName
        });
        this.snackbar.open('Usuario actualizado correctamente', 'Cerrar', {
          duration: 2500
        });
      } catch (err) {
        this.snackbar.open(err, 'Cerrar', { duration: 2500 });
      }
    }
  };
}
