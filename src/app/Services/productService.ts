import { Injectable } from '@angular/core';
import { DataProvider } from './dataService';
import { Product } from '../Class /Product';
import { Observable } from 'rxjs';
import { User } from '../Class /User';
import { IProduct } from '../Models/Product';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private mapService: DataProvider) { }

  getProducts(filter?: string, filterBy?: string | number): Observable<Product[]> {
    if (filter !== null && filterBy !== null) {
      return this.mapService.getObjectList('products', filter, filterBy, 10);
    }

    if (filter !== null) {
      return this.mapService.getObjectListNumber('products', 5);
    }
    return this.mapService.getObjectListNumber<Product>('products', 5);
  }

  getProduct(id: string): Observable<Product> {
    return this.mapService.getObject<Product>(`products/${id}`);
  }
}
