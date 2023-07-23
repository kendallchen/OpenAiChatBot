import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { IChatMsg, MessageType } from '../model/IChatMsg';
import { ChatService } from '../service/chat.service';

@Component({
    selector: 'app-chat',
    templateUrl: './chat.component.html',
    styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {

    chatHistory: IChatMsg[] = [];
    frmQuery: FormGroup;

    constructor(private chatSvc: ChatService,
        private fb: FormBuilder) { }

    ngOnInit(): void {
        this.frmQuery = this.fb.group({
            txtQuery: [null]
        });
    }

    submitQuery() {
        let queryMessage: IChatMsg = { type: MessageType.Send, 
                                       message : this.frmQuery.get("txtQuery").value };
        this.chatHistory.push(queryMessage);
        this.chatSvc.chat(queryMessage)
            .subscribe(data => {
                if (data)
                {
                    this.chatHistory.push(data);
                }
            });
    }

}
