import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AngularFireDatabase } from '@angular/fire/database';
import { Product } from 'src/app/Class /Product';
import { AuthService } from 'src/app/Services/auth_service';
import { ProductStatus } from 'src/app/Enums/ProductStatus';
import { MatSnackBar } from '@angular/material';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';


function validateNumber(control: FormControl) {
  if (
    isNaN(Number(control.value.toString())) || control.value == null
  ) {
    return { invalidNumber: true };
  }
  return null;
}
@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {
  addForm: FormGroup;
  categories = ["Ninguna", "Escuela", "Tienda", "Trabajo"];
  selected = 'Ninguna';
  update: boolean = false;
  id: string = '';
  constructor(private db: AngularFireDatabase,
    private snackBar: MatSnackBar,
    private dataRouter: ActivatedRoute,
    private auth: AuthService) {
    
  }

  ngOnInit() {
    this.addForm = new FormGroup({
      name: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      image: new FormControl('', Validators.required),
      price: new FormControl('', [Validators.required, validateNumber])
    });
    if (this.dataRouter.snapshot.params['key'] !== null) {
      this.db.database.ref('products').child(JSON.parse(this.dataRouter.snapshot.params['key'])).once('value').then((data) => {
        this.addForm.value.name = data.val().name;
        this.addForm.value.price = data.val().price;
        this.addForm.value.description = data.val().description;
        this.selected = data.val().category;
        this.update = true;
        this.id = JSON.parse(this.dataRouter.snapshot.params['key'])
      });
    }
  }

  onSubmit = () => {
    if (this.addForm.valid) {
      const product = this.addForm.value as Product;
      const key = this.auth.getCurrentUser().uid;
      product.owner = key;
      product.category = this.selected;
      product.status = ProductStatus.PENDING;
      if (this.update === true) {
        this.db.database.ref('products/' + this.id).update(product).then(() => {
          this.snackBar.open("Success", "Continue");
          this.ngOnInit();
        });
      } else {
        this.db.database.ref('products').push(product).then(() => {
          this.snackBar.open("Success", "Continue");
          this.ngOnInit();
        });
      }
    } else {
      this.snackBar.open("Error", "Verifique sus datos");
    }
  }
}
