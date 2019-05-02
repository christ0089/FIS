import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ProductService } from 'src/app/Services/productService';
import { Product } from 'src/app/Class /Product';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  @Output()data = new EventEmitter();
  products$:Observable<Product[]>;

  constructor(
    public productService: ProductService,
    private router: Router
  ) {
    this.products$ = productService.getProducts();
  }

  ngOnInit() {
  }

  goToPage(key: string) {

    this.data.emit(key);
  }

}
