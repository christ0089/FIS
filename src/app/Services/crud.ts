import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FirebaseApp } from '@angular/fire';

/*
  Generated class for the ContentProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ContentProvider {

  constructor(public http: HttpClient,
    private db: FirebaseApp) {
  }


  updateContent(path, data) {
    const firebaseDb = this.db.database().ref().child(path);
    return new Promise((res, rej) => {
      return firebaseDb.update(data).catch((error) => {
        return rej(error);
      });
    });
  }

  pushContent(path, data) {
    const firebaseDb = this.db.database().ref().child(path);
    return new Promise((res, rej) => {
      return firebaseDb.push(data);
    });
  }

  removeContent(path) {
    const firebaseDb = this.db.database().ref().child(path);
    return new Promise((res, rej) => {
      return firebaseDb.remove().catch((error) => {
        return rej(error);
      });
    });
  }

}
