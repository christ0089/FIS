import { Product } from "../Models/Product";

export class Cart implements Cart {

    _products: Product[];
    _total : number;
    _uid : string;

    setProducts(product: Product[]) {
        this._products = product;
    }

    setTotal(total: number) {
        this._total = total;
    }

    setUID(uid: string) {
        this._uid = uid;
    }

    Total() {
    }

}