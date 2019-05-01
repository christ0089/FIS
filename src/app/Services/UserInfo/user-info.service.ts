import { Injectable } from '@angular/core';
import { FirebaseApp } from '@angular/fire';
import { Http } from '@angular/http';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { User } from 'src/app/Models/User';

@Injectable({
  providedIn: 'root'
})
export class UserInfoService {
  public userData: User; 
  userID: string = null;

  constructor(public http: Http,
    private firebase: FirebaseApp, private router:Router, 
    private snackBar: MatSnackBar) {
      this.userData = {
        Name : "",
        ProfileImg : "",
        Email : "",
        CoverImg : "",
        uid: ""
      }
  }

  isMember : boolean = false;
  async getCurrentSession() {
    // this.auth.afAuth.authState.subscribe(user => {
    //   if (user == null) {
    //     this.signOut();
    //   } else {
    //     if (user.emailVerified == true || user.uid != null) {
    //       this.loadData(user.uid);
    //     }
    //   }
    // });
  }

  // signOut() {
  //   this.auth.signOut().then(() => {
  //     this.userID = null;
  //     this.userData = null;
  //   });
  // }

  loadData(id) {
    this.userID = id;
    return new Promise((res, rej) => {
      this.getUserData();
      return res(this.userData);
    })

  }

  getUserData() {
    const db = this.firebase.database().ref()
  
    db.child("UserNode/Users").child(this.userID).on("value", (snapchot) => {
      if (snapchot.val() == null) {
        return
      }
      this.userData = snapchot.val();
  
    })
    db.child("MembershipController/isMember").child(this.userID).on("value", (snapchot) => {
      if (snapchot.val() == true)
      {
        this.isMember = true;
        return;
      }
      this.isMember = false;
    })
  }

  registerUser(credentials) {
    return this.firebase.auth().createUserWithEmailAndPassword(credentials.email,credentials.pwd)
  }

  uploadUserData(data) {
    const db = this.firebase.database().ref()
    return db.child("UserData").child(data.id).set({
      "Name": data.Contact,
      "Phone": data.Telefono,
      "Img": data.Logo,
      "Email": data.Email,
      "Address" : data.Address,
      "NombreLote" : data.NombreLote,
      Contact: data.Contact,
      "isPhonePublic": false,
      "isAdmin": false
    })
  }

  // updateUserData(data:User) {
  //   const db = this.firebase.database().ref()
  //   if (data.Tagline != null) {
  //     return db.child("UserNode/Users").child(data.key).update({
  //       "ProfileImg": data.ProfileImg,
  //       "CoverImg": data.CoverImg,
  //       "Tagline" : data.Tagline,
  //       "Name" : data.Name,
  //     }).then(() => {
  //       this.userData = data;
  //     })
  //   }
  //   return db.child("UserNode/Users").child(data.key).update({
  //     "ProfileImg": data.ProfileImg,
  //     "Name" : data.Name,
  //   }).then(() => {
  //     this.userData = data;
  //   })

  // }
}
