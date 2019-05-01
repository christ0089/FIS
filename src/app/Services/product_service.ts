import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})

export class ProductService {
  constructor(
    private afDb: AngularFireDatabase
  ) {}

  getProducts () {
    return this.afDb.list('products').valueChanges();
  }
}
