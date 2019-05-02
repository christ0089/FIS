import { Pipe, PipeTransform } from '@angular/core';
import { ProductStatus } from '../Enums/ProductStatus';

/**
 * Generated class for the ReversePipe pipe.
 *
 * See https://angular.io/api/core/Pipe for more info on Angular Pipes.
 */
@Pipe({
    name: 'status',
})
export class StatusPipe implements PipeTransform {
    /**
     * Takes a value and makes it lowercase.
     */
    transform(value: ProductStatus) {
        if (ProductStatus.PENDING == value) {
            return "En Venta";
        }
        if (ProductStatus.SOLD == value) {
            return "Vendido";
        }
        return 'Removido'
    }
}