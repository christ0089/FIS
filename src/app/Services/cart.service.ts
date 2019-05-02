import { Injectable } from '@angular/core';
import { Cart } from '../Class /Cart';
import { Product } from '../Class /Product';
import { Observable, of, from } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  cart = new Cart();
  constructor() { }

  addToCart(product: Product) {
   this.cart.addProduct(product);
  }

  getProducts():Observable<Product[]> {
    return of(this.cart.getProducts());
  }

  getTotal() {
    return this.cart.getTotal();
  }

  removeFromCart(product: Product) {
   this.cart.removeProduct(product);
  }

  removeAll() {
    this.cart.setProducts([]);
  }

}
