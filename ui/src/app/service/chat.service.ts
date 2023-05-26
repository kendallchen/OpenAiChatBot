import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { IChatMsg, MessageType } from '../model/IChatMsg';
import { AppConfigService } from './app-config.service';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

    readonly url = this.appConfig.get('apiChat');

    private chatHistory: IChatMsg[] = [];

    private response = new BehaviorSubject<IChatMsg[] | null>(null);
    response$ = this.response.asObservable();

    constructor(private http:HttpClient,
                private appConfig:AppConfigService){}
                
    chat(query): Observable<IChatMsg[]>{
        //add to chat history
        const sendMsg : IChatMsg = { type: MessageType.Send, message : query };
        this.chatHistory.push(sendMsg);

        //get response
        let queryUrl = this.url + "?query=" + query;
        this.http.get<IChatMsg>(queryUrl).pipe()
            .subscribe(result=>{
                if (result){
                    const receiveMsg : IChatMsg = { type: MessageType.Receive, message : result.message };
                    this.chatHistory.push(receiveMsg);
                    this.response.next(this.chatHistory)
                }                    
            }
        )
        return this.response$;
    }

}