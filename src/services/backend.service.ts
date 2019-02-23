import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

import { User } from '../datatypes/datatypes';

const createHeaders = token => new Headers({'Authorization': 'Bearer ' + token});

@Injectable()
export class BackendService {
  BACKEND = '.';

  constructor(private http: Http) { }

  /** Sends login data to backend validation */
  sendLoginData(username: string, password: string): Observable<any> {
    return null;
    //return this.http.post(`${this.BACKEND}/login`, { username, password })
    //  .pipe(map(res => res.json()), 
    //  catchError(err => Observable.throw(err)));
  }

  /** Requests user data from backend */
  getUsers(): Observable<any> {
    return null;
  }

  /** Sends game creation data to backend */
  sendGameCreationData(player1: User, player2: User, player3: User, player4: User): Observable<any> {
    return null;
  }

}
