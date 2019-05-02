import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../Services/productService';
import { Product } from '../../Class /Product';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { CurrencyPipe} from '@angular/common';
import { CartService } from 'src/app/Services/cart.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  products$:Observable<Product[]>;

  constructor( 
    public productService: ProductService,
    private cardService: CartService,
    private router: Router
  ) {
    this.products$ = productService.getProducts();
  }

  ngOnInit() {
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
