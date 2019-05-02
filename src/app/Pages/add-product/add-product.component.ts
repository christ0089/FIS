import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AngularFireDatabase } from '@angular/fire/database';
import { Product } from 'src/app/Class /Product';
import { AuthService } from 'src/app/Services/auth_service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {
  addForm: FormGroup;

  constructor(private db: AngularFireDatabase, private auth: AuthService) {

  }

  ngOnInit() {
    this.addForm = new FormGroup({
      name: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      category: new FormControl('', [Validators.required]),
      image: new FormControl('', Validators.required),
      price: new FormControl('', Validators.required)
    });
  }

  onSubmit = () => {
    if (this.addForm.value.name !== '' && this.addForm.value.description !== '' && this.addForm.value.category !== '' && this.addForm.value.image !== '' && this.addForm.value.price !== '') {
      const product = this.addForm.value as Product;
      this.auth.getCurrentUser().getIdToken().then((token: string) => {
        product.setUID(token);
        this.db.database.ref('products').push(product);
      })
    }
  }
}
