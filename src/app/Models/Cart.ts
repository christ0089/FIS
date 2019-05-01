import { Product } from './Product';

export interface Cart {
    Products: Product[];
    Total: Number;
    uid: string;
}
