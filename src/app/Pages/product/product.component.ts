import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/Class /Product';
import { Observable } from 'rxjs';
import { ProductService } from 'src/app/Services/productService';
import { ActivatedRoute, Router } from '@angular/router';
import { CurrencyPipe } from '@angular/common';
import { CartService } from 'src/app/Services/cart.service';
@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  product$: Observable<Product>;
  cart$:Observable<Product[]>;
  total: number = 0;
  constructor(
    private productService: ProductService,
    private cartService: CartService,
    private router: Router,
    private dataRoute: ActivatedRoute) {

  }

  ngOnInit() {
    this.dataRoute.params.subscribe((data) => {
      const id = JSON.parse(this.dataRoute.snapshot.params['key']);
      this.product$ = this.productService.getProduct(id);
    })
   
    this.cart$ = this.cartService.getProducts();
  }

  

  addToCart(product: Product) {
    this.cartService.addToCart(product);
    this.total = this.cartService.getTotal();
  }

  goToPage(page, params?) {
    console.log(params);
    if (params != null) {
      this.router.navigate([page, JSON.stringify(params)]);
      return;
    }
    this.router.navigate([page]);
  }

}
