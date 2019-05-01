import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FirebaseApp } from '@angular/fire';
import { UserInfoService } from './UserInfo/user-info.service';

/*
  Generated class for the ContentProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ContentProvider {

  constructor(public http: HttpClient,
    private db: FirebaseApp,
    private userProvider: UserInfoService, ) {
  }

  postComment(path, key, data) {
    const firebaseDb = this.db.database().ref().child(path).child("Comments").child(key);
    return new Promise((res, rej) => {
        firebaseDb.push(data).then(() => {
          return res("Success");
        })
    })
  }

  postData(path, data) {
    if (this.userProvider.userData == null) {
      return;
    }
    this.postLike(path, data).then(() => {
      //   this.toastCtrl.presentToast("Thanks for supporting this author");
    }).catch((error) => {
      //  this.toastCtrl.presentErrorAlert(error);
    })
  }

  setData(path, data) {
    const firebaseDb = this.db.database().ref().child(path)
    return new Promise((res, rej) => {
      firebaseDb.push(data)
    })
  }

  postLike(path, data) {
    const firebaseDb = this.db.database().ref().child(path)
    return new Promise((res, rej) => {
      firebaseDb.update(data)
        .catch((error) => {
          //  this.toastCtrl.presentErrorAlert(error);
        })
    })
  }

  removeContent(path) {
    const firebaseDb = this.db.database().ref().child(path)
    return new Promise((res, rej) => {
      firebaseDb.remove()
        .then(() => {
          return res("Sucess");
        })
        .catch((error) => {
          return rej(error);
        })
    })
  }

}
