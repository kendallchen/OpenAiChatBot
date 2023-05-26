import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { IChatMsg } from '../model/IChatMsg';
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
    
    chat(query): Observable<IChatMsg>{
        let queryUrl = this.url + "?query=" + query;
        this.http.get<IChatMsg>(queryUrl).pipe()
            .subscribe(result=>{
                if (result)
                    this.response.next(result)
            }
        )
        return this.response$;
    }

}