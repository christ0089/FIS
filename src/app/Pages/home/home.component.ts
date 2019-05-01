import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../Services/product_service';
import { Product } from '../../Class /Product';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  products:any = [];

  constructor(
    public productService: ProductService
  ) {
    productService.getProducts().subscribe(products => {
      this.products = products;
    });
  }

  ngOnInit() {
  }
}
