import { ProductStatus } from "../Enums/ProductStatus";

export interface IProduct {
    name: string;
    price: number;
    coverImg: string;
    key: string;
    status: ProductStatus;
    owner: string;
}
