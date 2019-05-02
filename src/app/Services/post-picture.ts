


import { Injectable } from '@angular/core';

import * as firebaseRef from 'firebase';
/*
 Generated class for the StoreServiceProvider provider.

 See https://angular.io/guide/dependency-injection for more info on providers
 and Angular DI.
*/
@Injectable()
export class PostPicture {
  constructor() {

  }


  postPicture(url: File, path) {
    let imageURL = "profile_pic.jpg" + Date.now();
    return new Promise((resolve, reject) => {
      let storageRef = firebaseRef.storage().ref().child(path).child(imageURL);

      let parseUpload = storageRef.put(url);
      parseUpload.then(() => {
        return resolve(storageRef.getDownloadURL());
      }).catch((error) => {
        return reject(error);
      });
    })
  }
}