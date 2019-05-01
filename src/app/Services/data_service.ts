import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  AngularFirestoreCollection,
  DocumentChangeAction,

} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AngularFireList, AngularFireObject, AngularFireDatabase } from '@angular/fire/database';

@Injectable()
export class DataProvider {
  constructor(public http: HttpClient, private db: AngularFireDatabase) {

  }

  getContent<T>(branch: string, batch: number, lastKey: string, filterBy?: string, filter?: string): // 1 e 2
    Observable<T[]> {
    const contents = this.mapListKeys<T>( // 3
      this.db.list<T>(branch, ref => { // 4
        if (filterBy != null) {
          const query = ref
            .orderByChild(filterBy)
            .equalTo(filter)
            .limitToFirst(batch);
          return (lastKey) // 5
            ? query.startAt(lastKey)
            : query;
        }
        const query = ref
          .orderByChild('Timestamp')
          .limitToFirst(batch);
        return (lastKey) // 5
          ? query.startAt(lastKey)
          : query;
      })
    );
    return contents
  }
  getObjectListNumber<T>(path,limit: number, filterBy?: string, ): Observable<T[]> {
    return this.mapListKeys(this.db.list(path, ref => {
      const query = ref
      if (filterBy == null) {
        return query.limitToFirst(limit)
      }
      return query.orderByChild(filterBy).limitToFirst(limit)
    }));
  }
  getObjectList<T>(path,filterBy?: string, filter?: string | boolean, limit?: number): Observable<T[]> {
    return this.mapListKeys(this.db.list(path, ref => {
      const query = ref
      if (filterBy == null) {
        return query;
      }
      if (limit == null) {
        return query.orderByChild(filterBy).equalTo(filter)
      }
      return query.orderByChild(filterBy).equalTo(filter).limitToFirst(limit)
    }));
  }

  getObject<T>(path): Observable<T> {
    return this.mapObjectKey(this.db.object(path));
  } 

  mapListKeys<T>(list: AngularFireList<T>): Observable<T[]> {
    return list.snapshotChanges().pipe(
      map(actions =>
        actions.map(action => ({
          key: action.key,
          ...action.payload.exportVal()
        }))
      )
    );
  }

  mapObjectKey<T>(list: AngularFireObject<T>): Observable<T> {
    return list
      .snapshotChanges()
      .pipe(
        map(action => ({ key: action.key, ...action.payload.exportVal() }))
      );
  }

  mapFirestoreKeys<T>(list: AngularFirestoreCollection<T>): Observable<any[]> {
    return list.snapshotChanges().pipe(
      map((actions: DocumentChangeAction<T>[]) => {
        return actions.map((a: DocumentChangeAction<T>) => {
          const data: Object = a.payload.doc.data() as T;
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      })
    );
  }
}
