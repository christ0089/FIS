import { Component, OnInit, ViewChild } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { AngularFireDatabase } from "@angular/fire/database";
import { Product } from "src/app/Class /Product";
import { AuthService } from "src/app/Services/auth_service";
import { ProductStatus } from "src/app/Enums/ProductStatus";
import { MatSnackBar } from "@angular/material";
import { ActivatedRoute, Router } from "@angular/router";
import { Observable } from "rxjs";
import { PostPicture } from "src/app/Services/post-picture";

function validateNumber(control: FormControl) {
  if (isNaN(Number(control.value.toString())) || control.value == null) {
    return { invalidNumber: true };
  }
  return null;
}
@Component({
  selector: "app-add-product",
  templateUrl: "./add-product.component.html",
  styleUrls: ["./add-product.component.scss"],
})
export class AddProductComponent implements OnInit {
  addForm: FormGroup;
  categories = ["None", "Workout", "Food", "Memes", "Entertainment"];
  selected = "None";
  image = "./assets/Unknown.png";
  update: boolean = false;
  id: string = "";
  status = false;
  @ViewChild("fileUpload") myDiv;
  constructor(
    private db: AngularFireDatabase,
    private snackBar: MatSnackBar,
    private dataRouter: ActivatedRoute,
    private router: Router,
    private camera: PostPicture,
    private auth: AuthService
  ) {}

  ngOnInit() {
    this.addForm = new FormGroup({
      name: new FormControl("", Validators.required),
      description: new FormControl("", Validators.required),
      image: new FormControl("", Validators.required),
      // price: new FormControl('', [Validators.required, validateNumber])
    });
    console.log(this.dataRouter.snapshot.params["key"] );
    if (this.dataRouter.snapshot.params["key"] !== undefined) {
      this.db.database
        .ref("products")
        .child(JSON.parse(this.dataRouter.snapshot.params["key"]))
        .once("value")
        .then((data) => {
          console.log(data.val());
          this.addForm.get("name").setValue(data.val().name);
          this.addForm.get("description").setValue(data.val().description);
          this.addForm.get("image").setValue(data.val().image);
          this.image = data.val().image;
          this.selected = data.val().category;
          this.update = true;
          this.id = JSON.parse(this.dataRouter.snapshot.params["key"]);
        })
        .catch((e) => {
          console.log(e);
        });
    }
  }

  delete = () => {
    this.status = true;
    this.db.database
      .ref("products")
      .child(this.id)
      .remove()
      .then(() => {
        this.status = false;
        this.snackBar.open("Success", "Continue");
        this.router.navigate(["/home"]);
      });
  };

  onSubmit = () => {
    this.status = true;
    if (this.addForm.valid) {
      const product = this.addForm.value as Product;

      product.owner = {
        email: this.auth.afAuth.auth.currentUser.email,
        name: this.auth.afAuth.auth.currentUser.displayName,
        key: this.auth.afAuth.auth.currentUser.uid,
      };

      product.category = this.selected;
      product.status = ProductStatus.PENDING;
      if (this.update === true) {
        this.db.database
          .ref("products/" + this.id)
          .update(product)
          .then(() => {
            this.status = false;
            this.snackBar.open("Success", "Continue");
            this.ngOnInit();
          });
      } else {
        this.db.database
          .ref("products")
          .push(product)
          .then(() => {
            this.status = false;
            this.snackBar.open("Success", "Continue");
            this.router.navigate(["post", JSON.stringify(product.key)]);
          });
      }
    } else {
      this.snackBar.open("Error", "Verifique sus datos");
      this.status = false;
    }
  };

  openGallery(selection) {
    let el: HTMLElement = this.myDiv.nativeElement as HTMLElement;
    console.log(el);
    el.click();
  }

  addToDocument(event: FileList) {
    console.log("isTriggered");
    this.status = true;
    const file = event.item(0);

    if (file.type.split("/")[0] !== "image") {
      console.log("No Supported");
      return;
    }
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => this.postPicture(file, reader.result.toString());
  }

  postPicture(url: File, tempUrl) {
    this.addForm.get("image").setValue(tempUrl);
    this.image = tempUrl;
    this.camera
      .postPicture(url, `UserImages/${this.selected}/`)
      .then((firebaseUrl: string) => {
        this.status = false;
        this.addForm.get("image").setValue(firebaseUrl);
        this.image = firebaseUrl;
      })
      .catch((error) => {
        console.log(error);
      });
  }
}
