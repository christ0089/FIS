import { Injectable } from '@angular/core';
import { Cart } from '../Class /Cart';
import { Product } from '../Class /Product';
import { Observable, of, from } from 'rxjs';
import { DataProvider } from './dataService';
import { AngularFireDatabase } from '@angular/fire/database';
import { AuthService } from './auth_service';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  constructor(private mapService: DataProvider,
    private auth: AuthService,
    private db: AngularFireDatabase) {

  }


  getMessages(id): Observable<Product[]> {
    if (id !== null) {
      return this.mapService.getObjectListNumber(`messages/${id}`, 20, 'timestamp');
    }
  }

  getConversations(id): Observable<any[]> {
    return this.mapService.getObjectListNumber(`conversations/${id}`, 20, 'timestamp');
  }

  postMessages(id: string, message) {
    return this.db.database.ref(`messages/${id}`).push(message);
  }

  postConversation(productID:string,id, message: any) {
    const convID : string = Date.now().toFixed(0);
    const conversation = {
      time : this.getTimeStamp(),
      timestamp: -1 * Date.now(),
      convID: convID
    };

    const ref = this.db.database.ref(`conversations/${id}/${productID}`).set(conversation);
    const ref2 = this.db.database.ref(`conversations/${productID}/${id}`).set(conversation);
    const message_promise = this.postMessages(convID, message);
    return Promise.all([ref, ref2, message_promise]).then(() => {
      return convID;
    });
  }

  getTimeStamp() {
    const now = new Date();
    const date = now.getUTCFullYear() + '/' +
                 (now.getUTCMonth() + 1) + '/' +
                 now.getUTCDate();
    const time = now.getUTCHours() + ':' +
                 now.getUTCMinutes() + ':' +
                 now.getUTCSeconds();

    return (date + ' ' + time);
  }


}
