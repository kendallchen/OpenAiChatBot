import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { IChatMsg } from '../model/IChatMsg';
import { ChatService } from '../service/chat.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {

    chatHistory: IChatMsg[];
    frmQuery: FormGroup;

    constructor(private chatSvc:ChatService,
                private fb: FormBuilder) { }

    ngOnInit(): void {
        this.frmQuery = this.fb.group({
            txtQuery: ['', [Validators.required,
                            Validators.minLength(3),
                            Validators.maxLength(5000)]]
        }); 
    }

    sendQuery(){


        //   this.chatSvc.chat("what is the biggest tree in the world")
        //     .subscribe(data=>
        //       this.chatHistory = data
        //   );
    }

}
