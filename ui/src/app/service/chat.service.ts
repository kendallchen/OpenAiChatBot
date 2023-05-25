import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { IChat } from '../model/IChat';
import { AppConfigService } from './app-config.service';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

    readonly url = this.appConfig.get('apiChat');

    private response = new BehaviorSubject<IChat | null>(null);
    response$ = this.response.asObservable();

    constructor(private http:HttpClient,
                private appConfig:AppConfigService){}
    
    chat(query): Observable<IChat>{
        let queryUrl = this.url + "?query=" + query;
        this.http.get<IChat>(queryUrl).pipe()
            .subscribe(result=>{
                if (result)
                    this.response.next(result)
            }
        )
        return this.response$;
    }

}