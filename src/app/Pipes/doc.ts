import { Pipe, PipeTransform } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFireDatabase } from '@angular/fire/database'

@Pipe({
  name: 'doc',
})

export class DocPipe implements PipeTransform {
  /**
   * Takes a value and makes it lowercase.
   */
  constructor(private db: AngularFireDatabase) {

  }
  transform(value: any) : Observable<any> {
    return this.get(value)
  }

  get(path: string): Observable<any> {
    const path$ = this.db.object(path)
    return path$.valueChanges()
  }
}