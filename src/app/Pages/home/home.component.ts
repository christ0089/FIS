import { Component, OnInit, Input } from '@angular/core';
import { ProductService } from '../../Services/productService';
import { Product } from '../../Class /Product';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { CurrencyPipe } from '@angular/common';
import { CartService } from 'src/app/Services/cart.service';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  categories = ["Menu", "Escuela", "Tienda", "Trabajo"];

  products$: Observable<Product[]>;
  @Input('category') category: number;
  constructor(
    public productService: ProductService,
    private cartService: CartService,
    private router: Router
  ) {
    this.products$ = productService.getProducts();


  }

  ngOnInit() {

  }

  getSelected($event) {
    if ($event == 0) {
      this.products$ = this.productService.getProducts();
    } else {
      this.products$ = this.productService.getProducts('category', this.categories[$event]);
    }

  }

  goToPage(page, params?) {
    console.log(params)
    if (params != null) {
      this.router.navigate([page, JSON.stringify(params)]);
      return;
    }
    this.router.navigate([page]);
  }
}
