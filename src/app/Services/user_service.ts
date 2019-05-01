import { Injectable } from "@angular/core";
import { User } from "../Class /User";
import { AuthService } from "./auth_service";
import { DataProvider } from "./data_service";
import { BehaviorSubject, Observable } from "rxjs";
import { CrudProvider } from "./crud";


@Injectable({
    providedIn: 'root'
})
export class UserInfoService {
    private user =  new BehaviorSubject<User>(new User());


    constructor(private auth: AuthService, private mapService: DataProvider, private crud: CrudProvider) {

    }

    getUser(): Observable<User>{
        return this.user.asObservable();
    }

    getCurrentSession() {
        this.auth.getUserStatus().subscribe(user => {
            if (user == null) {
                this.signOut();
            } else {
                if (user.emailVerified === true || user.uid != null) {
                    this.getUserData(user.uid);
                }
            }
        });
    }

    signOut() {
        this.auth.signOut().then(() => {
            this.user = null;
        });
    }


    getUserData(id) {
        this.mapService.getObject<User>(`User/${id}`).toPromise().then((user) => {
            this.user.next(user);
        });
    }

    setUserData(user: User) {
        return this.crud.updateContent(`User/${user.getUID}`, user);
    }

}