import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { io, Socket } from 'socket.io-client';

@Injectable({
  providedIn: 'root',
})
export class Queue {

  private apiUrl= 'http://localhost:3000/api/tokens';
  private socket: Socket;

  public tokenUpdates$ = new Subject<any>();

  constructor(private http:HttpClient) {
    this.socket= io('http://localhost:3000');

    this.socket.on('token_created', (token)=> {
      this.tokenUpdates$.next({type:'create', token});
    });

    this.socket.on('token_updated', (token)=> {
      this.tokenUpdates$.next({type:'update',token})
    });
  }

  createToken(tokenNumber: string): Observable<any> {
    return this.http.post(this.apiUrl,{tokenNumber})
  };

  getAllTokens(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  updateStatus(id:string, status:string):Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`,{status})
  }
  
}
