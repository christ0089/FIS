import { IProduct } from '../Models/Product';

export class Product implements IProduct {

    _name: string;
    _price: number;
    _coverImg: string;
    _uid: string;

    constructor () {}

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
