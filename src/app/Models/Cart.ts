import { Product } from './Product';

export interface Cart {
    products: Product[];
    total: Number;
    uid: string;
}
