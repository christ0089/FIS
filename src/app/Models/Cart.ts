import { IProduct } from './Product';

export interface ICart {
    _products: IProduct[];
    _total: Number;
    _uid: string;
}
