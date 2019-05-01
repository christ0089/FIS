import { Injectable } from "@angular/core";
import { User } from "../Class /User";
import { AuthService } from "./auth_service";
import { DataProvider } from "./data_service";
import { IUser } from "../Models/User";
import { BehaviorSubject, Observable } from "rxjs";


@Injectable({
    providedIn: 'root'
})
export class UserInfoService {
    private user =  new BehaviorSubject<User>(new User());


    constructor(private auth: AuthService, private mapService: DataProvider) {

    }

    getUser(): Observable<User>{
        return this.user.asObservable();
    }
    async getCurrentSession() {
        this.auth.getUserStatus().subscribe(user => {
            if (user == null) {
                this.signOut();
            } else {
                if (user.emailVerified === true || user.uid != null) {
                    this.loadData(user.uid);
                }
            }
        });
    }

    signOut() {
        this.auth.signOut().then(() => {
            this.user = null;
        });
    }


    loadData(id) {
        this.mapService.getObject<User>(`User/${id}`).toPromise().then((user) => {
            this.user = user;
        });
    }

}