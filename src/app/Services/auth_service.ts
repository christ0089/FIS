import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable()
export class AuthService {
    private user: firebase.User;
    constructor(public afAuth: AngularFireAuth) {

    }

    getUserID() {
        return this.user;
    }

    getUserStatus() {
        return this.afAuth.authState;
    }

    signIn(credentials) {
        return new Promise((sucess, error) => {
            this.afAuth.auth.signInWithEmailAndPassword(credentials.Email, credentials.Password).then((success) => {
                this.user = this.afAuth.auth.currentUser;
                return sucess('Sucess');
            }).catch((_err: Error) => {
                return error(_err);
            })
        })
    }

    signOut() {
        return new Promise((resolve, error) => {
            this.afAuth.auth.signOut().then((success) => {
                return resolve('Success');
            }).catch((error) => {
                return error('Reject');
            });
        })
    }
}