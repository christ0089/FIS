import { Product } from "../Models/Product";

export class Cart implements Cart {

    _name: string;
    _price: number;
    _coverImg: string;
    _uid: string;

    constructor () {
        
    }
    setPrice(price: number) {
        this._price = price;
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

    getPrice() {
        return this._price;
    }

    getName(name: string) {
        return this._name;
    }

    getCoverImg(coverImg: string) {
        return this._coverImg;
    }
    getUID(uid: string) {
        return this._uid;
    }

}