import { IProduct } from "../Models/Product";
import { User } from "./User";

export class Product implements IProduct {

    name: string;
    price: number;
    coverImg: string;
    uid: string;
    owner: string;
    user: User;
    constructor() {

    }
    setPrice(price: number) {
        this.price = price;
    }

    setName(name: string) {
        this.name = name;
    }

    setCoverImg(coverImg: string) {
        this.coverImg = coverImg;
    }
    setUID(uid: string) {
        this.uid = uid;
    }

    setUser(user: User) {
        this.user = user;
    }

    getPrice() {
        return this.price;
    }

    getName(): string {
        return this.name;
    }

    getCoverImg(): string {
        return this.coverImg;
    }
    getUID(): string {
        return this.uid;
    }

    getOwner(): string {
        return this.owner;
    }

    getUser(user: User) {
        return user;
    }

}