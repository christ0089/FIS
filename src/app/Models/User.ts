import { UserTypes } from "../Enums/UserTypes";

export interface User {
    email: string;
    profileImg: string;
    name: string;
    coverImg: string;
    userType: UserTypes,
    uid: string;
}
