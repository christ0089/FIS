import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/Class /Product';
import { Observable } from 'rxjs';
import { ProductService } from 'src/app/Services/productService';
import { ActivatedRoute } from '@angular/router';
import { CurrencyPipe } from '@angular/common';
@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  product$: Observable<Product>;
  constructor(private productService: ProductService, private dataRoute: ActivatedRoute) {

  }

  ngOnInit() {
    const id = JSON.parse(this.dataRoute.snapshot.params['key']);
    this.product$ = this.productService.getProduct(id);
  }

}
