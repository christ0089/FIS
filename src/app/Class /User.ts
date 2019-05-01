export class User implements User {
    private _email: string;
    private _profileImg: string;
    private _name: string;
    private _coverImg: string;
    private _uid: string;

    constructor () {}

    setEmail(email: string) {
        this._email = email;
    }

    setProfileImg(profileImg: string) {
        this._profileImg = profileImg;
    }

    setName(name: string) {
        this._name = name;
    }

    setCoverImg(coverImg: string) {
        this._coverImg = coverImg;
    }
    setUID(uid: string) {
        this._uid = uid;
    }

    getEmail() {
        return this._email;
    }

    getProfileImg() {
        return this._profileImg;
    }

    getName() {
        return this._name;
    }

    getCoverImg() {
        return this._coverImg;
    }
    getUID() {
        return this._uid;
    }

}
