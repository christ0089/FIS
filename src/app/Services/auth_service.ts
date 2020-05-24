import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { AngularFireDatabase } from '@angular/fire/database';


@Injectable({
  providedIn: 'root'
})

export class AuthService {
  isLoggedIn = false;
  displayName = '';

  constructor(
    public afAuth: AngularFireAuth,
    private db: AngularFireDatabase,
    private router: Router
  ) {
    this.getUserData().subscribe(user => {
      if (user && user.uid) {
        this.displayName = user.displayName;
        this.isLoggedIn = true;
        this.router.navigate(['/home']);
      } else {
        this.isLoggedIn = false;
      }
    });
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
