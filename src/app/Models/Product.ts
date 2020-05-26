import { ProductStatus } from "../Enums/ProductStatus";
import { User } from "../Class /User";

export interface IProduct {
    name: string;
    price: number;
    coverImg: string;
    key: string;
    status: ProductStatus;
    favorite: boolean;
    owner: any;
}
