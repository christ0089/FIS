import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from '../../Services/auth_service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { ProductService } from 'src/app/Services/productService';
import { Observable } from 'rxjs';
import { Product } from 'src/app/Class /Product';
import { CurrencyPipe } from '@angular/common';
import { Router } from '@angular/router';
import { PostPicture } from 'src/app/Services/post-picture';
import { ProductStatus } from 'src/app/Enums/ProductStatus';

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
  image = 'https://image.flaticon.com/icons/svg/168/168730.svg';
  @ViewChild('fileUpload') myDiv;
  status = false;
  total = 0;
  constructor(
    private authService: AuthService,
    private productService: ProductService,
    private router: Router,
    private camera: PostPicture,
    public snackbar: MatSnackBar
  ) {}

  ngOnInit() {
    this.profileForm = new FormGroup({
      firstName: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      cellPhone: new FormControl(''),
      photoUrl: new FormControl('', Validators.required),
      email: new FormControl('', [
        Validators.required,
        Validators.email,
        validateMail
      ])
    });
    if (this.authService.getCurrentUser().photoURL !== null) {
      this.image = this.authService.getCurrentUser().photoURL;
    }
    this.profileForm.get("firstName").setValue(this.authService.getCurrentUser().displayName);
    this.profileForm.get("cellPhone").setValue(this.authService.getCurrentUser().phoneNumber);
    this.profileForm.get("email").setValue(this.authService.getCurrentUser().email);
    this.profileForm.get("photoUrl").setValue(this.authService.getCurrentUser().photoURL);
    this.products$ = this.productService.getProducts('owner', this.authService.getCurrentUser().uid);

    this.products$.subscribe((products) => {
      products.forEach(element => {
        if (element.status === ProductStatus.SOLD) {
          this.total += element.price;
        }
      });
    })
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
        if (cellPhone !== null) {
          currentUser.updatePhoneNumber(cellPhone);
        }
        currentUser.updateProfile({
          photoURL: photoUrl,
          displayName
        });
        this.image = photoUrl;
        this.snackbar.open('Usuario actualizado correctamente', 'Cerrar', {
          duration: 2500
        });
      } catch (err) {
        this.snackbar.open(err, 'Cerrar', { duration: 2500 });
      }
    }
  };

  deleteProduct(id) {
    this.productService.deleteProduct(id);
  }

  goToPage(page, params?) {
    console.log(params)
    if (params != null) {
      this.router.navigate([page, JSON.stringify(params)]);
      return;
    }
    this.router.navigate([page]);
  }


  openGallery(selection) {
    let el: HTMLElement = this.myDiv.nativeElement as HTMLElement;
    console.log(el);
    el.click();
  }

  addToDocument(event: FileList) {
    console.log("isTriggered");
    this.status = true;
    const file = event.item(0);

    if (file.type.split('/')[0] !== 'image') {
      console.log("No Supported");
      return;
    }
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => this.postPicture(file, reader.result.toString());
  }


  postPicture(url: File, tempUrl) {
    this.profileForm.get('photoUrl').setValue(tempUrl);
    this.image = tempUrl;
    this.camera.postPicture(url, `UserImages/${Date.now()}/`).then((firebaseUrl: string) => {
      this.status = false;
      this.profileForm.get('photoUrl').setValue(firebaseUrl);
      this.image = firebaseUrl;
    }).catch((error) => {
      console.log(error);
    });
  }
}

