
import { Product } from "./Product";

export class Cart implements Cart {

    private products: Product[];
    private _total: number;
    private _uid: string;

    constructor () {
        
    }
    setProducts(product: Product[]) {
       this.products = product;
    }

    setTotal(total: number) {
        this._total = total;
    }

    setUID(uid: string) {
        this._uid = uid;
    }

    getProducts(product: Product[]) {
        return this.products;
    }

    getTotal() {
        return this._total;
    }

    getUID(uid: string) {
        return this._uid;
    }

    Total() {
        let total = 0;
        return this.products.forEach(product => {
            total += product.price;
        });
    }



}