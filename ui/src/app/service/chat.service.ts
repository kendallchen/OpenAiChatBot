import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, from, of } from 'rxjs';
import { IChatMsg, MessageType } from '../model/IChatMsg';
import { AppConfigService } from './app-config.service';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

    readonly url = this.appConfig.get('apiChat');

    private chatHistory = new BehaviorSubject<IChatMsg[] | null>(null);
    chatHistory$ = this.chatHistory.asObservable();

    //stores the chat history
    chatHistoryRecord : IChatMsg[] = [];

    constructor(private http:HttpClient,
                private appConfig:AppConfigService){}


    chat(queryMessage: IChatMsg): Observable<IChatMsg[]>{
        if (!queryMessage)
            return this.chatHistory$;
        this.chatHistoryRecord.push(queryMessage);
        this.chatHistory.next(this.chatHistoryRecord.reverse());
        //get response
        let queryUrl = this.url + "?query=" + queryMessage.message;
        this.http.get<IChatMsg>(queryUrl).pipe()
            .subscribe(result=>{
                if (result){
                    const receiveMsg : IChatMsg = { type: MessageType.Receive, message : result.message };
                    this.chatHistoryRecord.push(receiveMsg);
                    this.chatHistory.next(this.chatHistoryRecord.reverse());
                }                    
            }
        )
        return this.chatHistory$;
    }

}