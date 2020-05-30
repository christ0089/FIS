import { Pipe, PipeTransform } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFireDatabase } from '@angular/fire/database'

@Pipe({
  name: 'fireDate',
})

export class DateFixPipe implements PipeTransform {
  /**
   * Takes a value and makes it lowercase.
   */
  constructor(private db: AngularFireDatabase) {

  }
  transform(value: number) {
    console.log(new Date(value / 1000).toDateString());
    return new Date(value);
  }

 
}