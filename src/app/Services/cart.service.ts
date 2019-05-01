import { Injectable } from '@angular/core';
import { Cart } from '../Class /Cart';
import { Product } from '../Class /Product';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  cart = new Cart();
  constructor() { }

  addToCart(product: Product) {
   // this.cart.addProduct(product);
  }

  removeFromCart(product: Product) {
  //  this.cart.removeProduct(product);
  }

}
