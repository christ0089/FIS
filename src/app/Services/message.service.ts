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
    const convID:string = Date.now().toFixed(0);
    console.log(productID);
    const ref = this.db.database.ref(`conversations/${id}/${productID}`).set({ timestamp: -1 * Date.now(), convID: convID});
    const ref2 = this.db.database.ref(`conversations/${productID}/${id}`).set({ timestamp: -1 * Date.now(), convID: convID});
    const message_promise = this.postMessages(convID, message);
    return Promise.all([ref, ref2, message_promise]).then(() => {
      return convID;
    });
  }


}
