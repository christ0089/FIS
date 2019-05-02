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
  id: string = "";
  constructor(private mapService: DataProvider,
    private auth: AuthService,
    private db: AngularFireDatabase) {
    this.id = this.auth.getCurrentUser().uid;
  }


  getMessages(id): Observable<Product[]> {
    if (id !== null) {
      return this.mapService.getObjectListNumber(`messages/${id}`, 20, 'category');
    }
  }

  getConversations(): Observable<any[]> {
    return this.mapService.getObjectListNumber(`conversations/${this.id}`, 20, 'timestamp');
  }

  postMessages(id: string, message) {
    console.log(id);
    return this.db.database.ref(`messages/${id}`).push(message);
  }

  postConversation(productID:string, message: any) {
    const convID:string = Date.now().toFixed(0);
    const ref = this.db.database.ref(`conversations/${this.id}/${productID}/${convID}`).set({ timestamp: -1 * Date.now() });
    const ref2 = this.db.database.ref(`conversations/${productID}/${this.id}/${convID}`).set({ timestamp: -1 * Date.now() });
    const message_promise = this.postMessages(convID, message);
    return Promise.all([ref, ref2, message_promise]);
  }


}
