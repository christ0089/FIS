import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/Class /Product';
import { Observable } from 'rxjs';
import { ProductService } from 'src/app/Services/productService';
import { ActivatedRoute, Router } from '@angular/router';
import { CurrencyPipe } from '@angular/common';
import { CartService } from 'src/app/Services/cart.service';
import { PurchaseComponent } from './purchace.component';
import { MatDialog, MatSnackBar } from '@angular/material';
import { AngularFireDatabase } from '@angular/fire/database';
import { AuthService } from 'src/app/Services/auth_service';
import { ProductStatus } from 'src/app/Enums/ProductStatus';
import { auth } from 'firebase';
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
    private dialog: MatDialog,
    private router: Router,
    private snackBar: MatSnackBar,
    private auth: AuthService,
    private database: AngularFireDatabase,
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
    if (page === 'chats' && this.auth.isLoggedIn === false) {
      return this.router.navigate(['/login']);
    }
    if (params != null) {
      return this.router.navigate([page, JSON.stringify(params)]);
    }
    return this.router.navigate([page]);
  }

  checkIfAuth() {
    if (this.auth.isLoggedIn == true) {
      return true;
    }
    this.snackBar.open('Error', 'Inicia Seccion para continuar');
    return false;
  }

  removeFromCart(product:Product) {
    this.cartService.removeFromCart(product);
    this.total = this.cartService.getTotal();
  }


  openPurchaseDialog(id) {
    if (this.auth.isLoggedIn == false) {
      return this.router.navigate(['/login']);
    }
    const dialogRef = this.dialog.open(PurchaseComponent, {
      width: '800px',
      maxWidth: '100%',
      height: 'fit-content',
      maxHeight: window.screen.height.toString(),
      data: { total : this.total}
    });

    dialogRef.afterClosed().toPromise().then((data) => {
      if (data.success == true) {
        this.database.database.ref(`products/${id}`).update({status : ProductStatus.SOLD}).then(() => {
          this.cartService.removeAll();
          this.total = this.cartService.getTotal();
          this.snackBar.open('Exito', 'Se ha realizado tu compra');
        });
      }
    })
  }

}
