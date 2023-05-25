import { Component, OnInit } from '@angular/core';
import { IChat } from '../model/IChat';
import { ChatService } from '../service/chat.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {

  chat: IChat;

  constructor(private chatSvc:ChatService) { }

  ngOnInit(): void {
    this.sendMessage();
  }

  sendMessage(){
    
      this.chatSvc.chat("what is the biggest tree in the world")
        .subscribe(data=>
          this.chat = data
      );
  }

}
