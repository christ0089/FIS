import { MAT_DIALOG_DATA, MatSnackBar, MatDialogRef } from "@angular/material";
import { Inject, Component } from "@angular/core";
import { Cart } from "src/app/Class /Cart";
import { Observable } from "rxjs";
import { CartService } from "src/app/Services/cart.service";
import { Product } from "src/app/Class /Product";
import { FormGroup, FormControl, Validators } from "@angular/forms";

function validateNumber(control: FormControl) {
    if (
        isNaN(Number(control.value.toString()))
    ) {
        return { invalidNumber: true };
    }
    return null;
}
@Component({
    selector: 'purshase-component',
    styleUrls: ['product.component.scss'],
    templateUrl: 'purchase.modal.html',
})
export class PurchaseComponent {
    cart$: Observable<Product[]>;
    cardForm: FormGroup;
    constructor(
        public dialogRef: MatDialogRef<PurchaseComponent>,
        public snackBar: MatSnackBar,
        private cartService: CartService,
        @Inject(MAT_DIALOG_DATA) public data: any) {
        if (data != null) {
            this.cart$ = this.cartService.getProducts();
        }
        this.cardForm = new FormGroup({
            name: new FormControl('', [
              Validators.required,
            ]),
            card_number: new FormControl('', [Validators.required, validateNumber]),
            security_code: new FormControl('', [Validators.required, validateNumber])
          });
    }

    onSubmit = async () => {
        if(this.cardForm.valid == true) {
            this.dialogRef.close({ success: true });
        } else {
            this.snackBar.open('Algo esta mal', 'Verfique');
        }
    }

    setAsFavorite(product, indx) {

    }

    onNoClick() {
        this.dialogRef.close({ success: false });
    }
}
