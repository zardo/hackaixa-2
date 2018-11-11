import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Dialogflow} from '../models/dialogflow';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DialogflowService {

  private baseURL = 'https://api.dialogflow.com/v1/query?v=20150910';
  private token = '24e7e3531a5141658e3eed0761bcbe12';
  private sessionId = '_' + Math.random().toString(36).substr(2, 9);

  constructor(private http: HttpClient) {
  }

  public getResponse(query: string): Observable<Dialogflow> {
    const data = {
      query: query,
      lang: 'en',
      sessionId: this.sessionId
    };
    return this.http
      .post<Dialogflow>(`${this.baseURL}`, data, {
        headers: new HttpHeaders({
          'Authorization': `Bearer ${this.token}`
        })
      });
  }

}
