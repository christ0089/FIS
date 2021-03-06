import { Injectable } from '@angular/core';
import { DataProvider } from './dataService';
import { Product } from '../Class /Product';
import { Observable } from 'rxjs';
import { User } from '../Class /User';
import { IProduct } from '../Models/Product';
import { map } from 'rxjs/operators';
import { AngularFireDatabase } from '@angular/fire/database';
import { ValueTransformer } from '@angular/compiler/src/util';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private mapService: DataProvider, private db: AngularFireDatabase) { }

  getProducts(filter?: string, filterBy?: string | number): Observable<Product[]> {
    if (filter !== null && filterBy !== null) {
      return this.mapService.getObjectList<Product>('products', filter, filterBy, 10);
    }

    if (filter !== null) {
      return this.mapService.getObjectListNumber<Product>('products', 5);
    }

    return this.mapService.getObjectListNumber<Product>('products', 5);
  }

  getProduct(id: string): Observable<Product> {
    return this.mapService.getObject<Product>(`products/${id}`);
  }

  getUserData = async (id: string) => {
    const user = await this.db.database.ref(`users/${id}`).on("value", function(snapshot) {
      console.log("snapshot", snapshot.val());
      return snapshot.val();
    });

    console.log("user: ", user)
  }

  deleteProduct(id) {
    return this.db.database.ref(`products/${id}`).remove()
  }
  updateProduct(id, product) {
    return this.db.database.ref(`products/${id}`).update(product)
  }
}
