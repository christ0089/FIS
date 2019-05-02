import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { MessageService } from 'src/app/Services/message.service';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/Services/auth_service';
import { DatePipe} from '@angular/common';

@Component({
  selector: 'app-chats',
  templateUrl: './chats.component.html',
  styleUrls: ['./chats.component.scss']
})
export class ChatsComponent implements OnInit {
  conversation$: Observable<any[]>;
  messages$: Observable<any[]>;
  id: string = '';
  selectedConv: string = '';
  message: string = '';
  constructor(private message_service: MessageService,
    private auth: AuthService,
    private dataRouter: ActivatedRoute) {
    this.id = this.auth.getCurrentUser().uid;

  }

  ngOnInit() {
    this.conversation$ = this.message_service.getConversations(this.id);
    if (JSON.parse(this.dataRouter.snapshot.params['key']) !== null) {

      const key = JSON.parse(this.dataRouter.snapshot.params['key']);

      this.conversation$.toPromise().then((conversations) => {
        conversations.forEach(element => {
          console.log(element);
          if (element.key === key) {
            this.messages$ = this.message_service.getMessages(element.convID);
            return;
          }
        });
      });
      const messageObj = {
        message: "Hola",
        sender: this.auth.getCurrentUser().uid,
        timestamp: Date.now(),
      }
      this.message_service.postConversation(key, this.id, messageObj).then((convID) => {
        this.messages$ = this.message_service.getMessages(convID);
      });
    } else {
      this.conversation$.toPromise().then((conversations) => {
        if (conversations !== null) {
          this.messages$ = this.message_service.getMessages(conversations[0].convID);
        }
      });
    }
  }


  getMessages(id) {
    this.selectedConv = id
    this.messages$ = this.message_service.getMessages(this.selectedConv);
  }

  postMessage() {
    const messageObj = {
      message: this.message,
      sender: this.auth.getCurrentUser().uid,
      timestamp: Date.now(),
    }
    this.message_service.postMessages(this.selectedConv, messageObj);
  }

}
