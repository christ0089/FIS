import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { reject } from 'q';

@Injectable({
  providedIn: 'root'
})
export class ContentLoaderService {

  constructor(private databaseRef: AngularFireDatabase) {
    //this.userID = user.afAuth.auth.currentUser.uid;
  }

  private userID: string;
  LoadContent(contentPath) {
    let dataArray = [];
    let id = this.userID;
    return new Promise((resolve, reject) => {
      this.databaseRef.database.ref().child(contentPath).on('value', function (snap) {

        snap.forEach((item) => {
          var data = item.val();

          var imageData = {
            "Img" : data.Image,
            "Uploader" : contentPath == "PublicContent" ? data.Uploader : id,
          }
          dataArray.push(imageData);
          
        })
        console.log(dataArray);
        return resolve(dataArray);
      }, function (error) {
        return reject(error);
      })
    })
  }

  data = [];

  LoadAllUsers() {
    let id = this.userID;
    let userArray = []
    return new Promise((resolve, reject) => {
      this.databaseRef.database.ref().child("UserData").on('value', function (snap) {
        snap.forEach((user) => {
          if (user.key != id) {
            userArray.concat(user);
            return resolve(userArray);
          }
        })
      }, function (error) {
        return reject(error);
      })
    }).then(() => {
      this.data = userArray;
    })
  }
}
