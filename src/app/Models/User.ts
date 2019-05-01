import { UserTypes } from '../Enums/UserTypes';

export interface IUser {
    _email: string;
    _profileImg: string;
    _name: string;
    _coverImg: string;
    _userType: UserTypes;
    _uid: string;
}
