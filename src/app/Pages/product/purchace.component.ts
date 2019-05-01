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

    userLoginFunc() {
        //   let credentials = {
        //     "Email": this.email,
        //     "Password": this.psw
        //   }

        //   this.authService.signIn(credentials).then((success) => {
        //     this.user_service.getCurrentSession();
        //     this.onNoClick();
        //   }).catch(() => {
        //     this.snackBar.open("Error", "Volver a Intentar", {
        //       duration: 2000,
        //     });
        //   });
    }

    userGoogleLogin() {
        //   this.authService.doGoogleLogin().then((res: firebase.auth.UserCredential) => {
        //     this.user_service.loadData(res.user.uid).then((data: User) => {
        //       console.log(data);
        //       if (data == null) {
        //         let user: User = {
        //           Name: "",
        //           CoverImg: "",
        //           Followers: 0,
        //           Following: 0,
        //           Skill: "",
        //           Startup: null,
        //           UserName: "",
        //           ProfileImg: "",
        //           Email: "",
        //           key: "",
        //           Tagline: ""
        //         }
        //         user.ProfileImg = res.user.photoURL;
        //         user.Name = res.user.displayName;
        //         user.Email = res.user.email;
        //         this.registerUser.uploadData(user);
        //       }
        //     });
        //     this.onNoClick();
        //   })
    }

   
    onNoClick(): void {
        this.dialogRef.close();
    }
    loginWithEmail() {
      
    }
}
