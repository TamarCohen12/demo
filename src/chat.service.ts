import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { mockUserInfo } from './mocks/mock-user-info';
import { UserInfoResponse } from './app/models/userInfo.model';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  private apiUrl = 'http://localhost:5000/api'; 

  constructor(private http: HttpClient) {}

  getUserInfo(): Observable<UserInfoResponse> {
    return of(mockUserInfo);
  }

  initialize(): Observable<any> {
    return this.http.post(`${this.apiUrl}/initialize`, {});
  }

  askQuestion(question: string,userInfo: UserInfoResponse | null): Observable<any> {
    // const params = new HttpParams().set('question', question);
    return this.http.post(`${this.apiUrl}/ask`, {maanimWithKriteryonim: userInfo?.maanimWithKriteryonim, taktzivimLemosad: userInfo?.taktzivimLemosad, question });
  }


}
