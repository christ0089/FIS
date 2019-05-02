import { Product } from "./Product";

export class Cart implements Cart {

    private products: Product[] = [];
    total = 0;
    private _uid: string;

    setProducts(product: Product[]) {
       this.products = product;
    }

    setTotal(total: number) {
        this.total = total;
    }

    setUID(uid: string) {
        this._uid = uid;
    }

    getProducts() {
        return this.products;
    }

    getTotal() {
        return this.total;
    }

    getUID(uid: string) {
        return this._uid;
    }

    calcTotal() {
        this.total = this.products.reduce((total, product) => total + product.price, 0);
    }

    getCartItems() {
        return this.products.length;
    }


    addProduct(product: Product) {
        console.log(product);
        this.products.push(product);
        this.calcTotal();
    }


    removeProduct(product: Product) {
        this.products = this.products.splice(this.products.indexOf(product), 1);
        this.calcTotal();
    }


}
