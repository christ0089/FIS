import { MAT_DIALOG_DATA, MatSnackBar, MatDialogRef } from "@angular/material";
import { Inject, Component } from "@angular/core";
import { Cart } from "src/app/Class /Cart";
import { Observable } from "rxjs";
import { CartService } from "src/app/Services/cart.service";
import { Product } from "src/app/Class /Product";

@Component({
    selector: 'purshase-component',
    styleUrls: ['product.component.scss'],
    templateUrl: 'purchase.modal.html',
})
export class PurchaseComponent {
    cart$: Observable<Product[]>;
    constructor(
        public dialogRef: MatDialogRef<PurchaseComponent>,
        public snackBar: MatSnackBar,
        private cartService: CartService,
        @Inject(MAT_DIALOG_DATA) public data: any) {
        if (data != null) {
            this.cart$ = this.cartService.getProducts();
        }
    }

    onSubmit = async () => {
        this.dialogRef.close({success : true});
    }
}
