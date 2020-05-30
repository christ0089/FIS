import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs";
import { MessageService } from "src/app/Services/message.service";
import { ActivatedRoute } from "@angular/router";
import { AuthService } from "src/app/Services/auth_service";
import { DatePipe } from "@angular/common";
import { trigger, transition, style, animate } from "@angular/animations";
import { tap, take } from "rxjs/operators";

@Component({
  selector: "app-chats",
  templateUrl: "./chats.component.html",
  styleUrls: ["./chats.component.scss"],
  animations: [
    trigger("fadeIn", [
      transition(":enter", [
        style({
          opacity: "0",
        }),
        animate(".3s ease-in"),
      ]),
    ]),
  ],
})
export class ChatsComponent implements OnInit {
  conversation$: Observable<any[]>;
  messages$: Observable<any[]>;
  id: string = "";
  selectedConv: string = "";
  message: string = "";
  constructor(
    private message_service: MessageService,
    private auth: AuthService,
    private dataRouter: ActivatedRoute
  ) {
    this.id = this.auth.getCurrentUser().uid;
  }

  ngOnInit() {
    this.conversation$ = this.message_service.getConversations(this.id);
    const data = this.dataRouter.snapshot.params;
    
    if (Object.entries(data).length !== 0) {
      const key = JSON.parse(data["key"]);
      this.conversation$
        .pipe(
          take(1),
          tap((conversations) => {
            const exists = conversations.filter(function (o) {
              return o.key === key;
            });

            if (exists.length == 0) {
              const messageObj = {
                message: "Hola",
                sender: this.auth.getCurrentUser().uid,
                timestamp: Date.now(),
              };
              this.message_service
                .postConversation(key, this.id, messageObj)
                .then((convID) => {
                  this.getMessages(convID);
                });
            } else {
              this.getMessages(exists[0].convID);
            }
          })
        )
        .subscribe();
    } else {
      this.conversation$
      .pipe(
        take(1),
        tap((conversations) => {
          console.log(conversations);
          if (conversations !== null) {
            this.getMessages(conversations[0].convID);
          }
        })
      )
      .subscribe();
    }
  }

  getMessages(id) {
    this.selectedConv = id;
    this.messages$ = this.message_service.getMessages(this.selectedConv);
  }

  postMessage() {
    const messageObj = {
      message: this.message,
      sender: this.auth.getCurrentUser().uid,
      timestamp: Date.now(),
    };
    if (this.message) {
      this.message_service.postMessages(this.selectedConv, messageObj);
      this.message = "";
    }
  }
}
