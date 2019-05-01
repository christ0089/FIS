import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../Services/product_service';
import { Product } from '../../Class /Product';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  products:Product[] = [];

  constructor(
    public productService: ProductService
  ) {

  }

  ngOnInit() {
  }
}
