import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { IChatMsg, MessageType } from '../model/IChatMsg';
import { ChatService } from '../service/chat.service';
import { Observable } from 'rxjs';

@Component({
    selector: 'app-chat',
    templateUrl: './chat.component.html',
    styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {

    frmQuery: FormGroup;

    chatHistory: IChatMsg[];

    constructor(private chatSvc: ChatService,
        private fb: FormBuilder) { }

    ngOnInit(): void {
        this.frmQuery = this.fb.group({
            txtQuery: [null]
        });

        this.chatSvc.chat(null)
            .subscribe(aa => this.chatHistory = aa);
    }

    submitQuery() {
        let queryMessage: IChatMsg = {
            type: MessageType.Send,
            message: this.frmQuery.get("txtQuery").value
        };
        this.chatSvc.chat(queryMessage);
    }

}
