import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { AngularFireDatabase } from '@angular/fire/database';
import { User } from '../Class /User';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})

export class AuthService {
  isLoggedIn = false;
  displayName = '';
  currentUser: any;
  constructor(
    public afAuth: AngularFireAuth,
    private db: AngularFireDatabase,
    private router: Router
  ) {
    this.getUserData().subscribe(user => {
      this.logService(user);
    });
  }

  logService(user) {
    if (user && user.uid) {
      this.displayName = user.displayName;
      this.isLoggedIn = true;
      this.router.navigate(['/home']);
      this.getUser(user.uid).toPromise().then((userData) => {
        console.log(userData);
        this.currentUser = userData;
      });
    } else {
      this.isLoggedIn = false;
    }
  }

  getUserData() {
    return this.afAuth.user;
  }

  logIn(credentials) {
    return this.afAuth.auth.signInWithEmailAndPassword(
      credentials.email,
      credentials.password
    );
  }

  getCurrentUser() {
    return this.afAuth.auth.currentUser;
  }

  getUser(uid): Observable<any> {
    return this.db.object<any>(`users/${uid}`).valueChanges();
  }

  signUp = async ({ email, password, firstName, lastName }) => {
    const response = await this.afAuth.auth.createUserWithEmailAndPassword(
      email,
      password
    );
    console.log(response);
    const uid = response.user.uid;
    await this.db.database.ref(`users/${uid}`).set({displayName: `${firstName} ${lastName}`, email});
    this.displayName = `${firstName} ${lastName}`;
    await this.afAuth.auth.currentUser.updateProfile({
      displayName: this.displayName,
      photoURL: ''
    });
  }

  logOut() {
    return this.afAuth.auth.signOut();
  }
}
