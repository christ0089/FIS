import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AngularFireDatabase } from '@angular/fire/database';
import { Product } from 'src/app/Class /Product';
import { AuthService } from 'src/app/Services/auth_service';
import { ProductStatus } from 'src/app/Enums/ProductStatus';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {
  addForm: FormGroup;
  categories = ["Ninguna","Escuela", "Tienda", "Trabajo"];
  selected = 'Ninguna';
  constructor(private db: AngularFireDatabase,
     private snackBar: MatSnackBar,
     private auth: AuthService) {

  }

  ngOnInit() {
    this.addForm = new FormGroup({
      name: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      image: new FormControl('', Validators.required),
      price: new FormControl('', Validators.required)
    });
  }

  onSubmit = () => {
    if (this.addForm.value.name !== '' && this.addForm.value.description !== '' && this.addForm.value.image !== '' && this.addForm.value.price !== '') {
      const product = this.addForm.value as Product;
      const key = this.auth.getCurrentUser().uid;
      product.owner = key;
      product.category =  this.selected;
      product.status = ProductStatus.PENDING;
      this.db.database.ref('products').push(product).then(() => {
        this.snackBar.open("Success", "Continue");
        this.ngOnInit();
      });

    }
  }
}
