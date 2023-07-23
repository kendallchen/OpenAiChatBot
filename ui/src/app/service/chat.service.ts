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

    private response = new BehaviorSubject<IChatMsg | null>(null);
    response$ = this.response.asObservable();

    constructor(private http:HttpClient,
                private appConfig:AppConfigService){}
                
    chat(queryMessage: IChatMsg): Observable<IChatMsg>{
        //get response
        let queryUrl = this.url + "?query=" + queryMessage.message;
        this.http.get<IChatMsg>(queryUrl).pipe()
            .subscribe(result=>{
                if (result){
                    const receiveMsg : IChatMsg = { type: MessageType.Receive, message : result.message };
                    this.response.next(receiveMsg)
                }                    
            }
        )
        return this.response$;
    }

}