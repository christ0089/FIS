import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  isLoggedIn = false;
  displayName = '';

  constructor(
    public afAuth: AngularFireAuth
  ) {
    this.getUserData().subscribe(user => {
      if (user && user.uid) {
        this.displayName = user.displayName;
        this.isLoggedIn = true;
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
    await this.afAuth.auth.createUserWithEmailAndPassword(
      email,
      password
    );
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
