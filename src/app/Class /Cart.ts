import { IProduct } from "../Models/Product";

export class Cart implements Cart {

    private _products: IProduct[];
    private _total: number;
    private _uid: string;

    constructor () {
        
    }
    setProducts(product: IProduct[]) {
        this._products = product;
    }

    setTotal(total: number) {
        this._total = total;
    }

    setUID(uid: string) {
        this._uid = uid;
    }

    getProducts(product: IProduct[]) {
        return this._products;
    }

    getTotal() {
        return this._total;
    }

    getUID(uid: string) {
        return this._uid;
    }

    Total() {
        let total = 0;
        return this._products.forEach(product => {
            total += product.price;
        });
    }

}