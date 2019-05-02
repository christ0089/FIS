import { IProduct } from "../Models/Product";
import { User } from "./User";
import { ProductStatus } from "../Enums/ProductStatus";

export class Product implements IProduct {

    name: string;
    price: number;
    coverImg: string;
    key: string = '';
    category: string;
    owner: string = '';
    status: ProductStatus;
    user: User;
    favorite = false;
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

    setUID(key: string) {
        this.key = key;
    }

    setOwner(key: string) {
        console.log(key);
        this.key = key;
    }

    setCategory(category: string) {
        this.category = category;
    }

    setUser(user: User) {
        this.user = user;
    }

    setProductStatus(status: ProductStatus) {
        this.status = status;
    }

    getPrice() {
        return this.price;
    }
    setAsFavorite(value: boolean) {
        this.favorite = value === true ? false : true;
    }

    getName(): string {
        return this.name;
    }

    getCoverImg(): string {
        return this.coverImg;
    }
    getUID(): string {
        return this.key;
    }

    getOwner(): string {
        return this.owner;
    }

    getUser(user: User) {
        return user;
    }

}