import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { User, Game } from '../datatypes/datatypes';

@Injectable()
export class BackendService {
  BACKEND = '.';

  constructor(private http: Http) { }

  /** Sends login data to backend validation */
  sendLoginData(username: string, password: string): Observable<any> {
    return this.http.post("/login", { username, password })
    .pipe(map(res => res.json()), catchError((err) => of(err)));
  }

  /** Requests user data from backend */
  getUsers(searchString: string): Observable<any> {
    return this.http.post("/queryUser", { search: searchString })
    .pipe(map(res => res.json()), catchError(err => of(err)));
  }

  getUserByName(username: string): Observable<any> {
    return this.http.post("/getUser", { username: username })
    .pipe(map(res => res.json()), catchError(err => of(err)));
  }

  sendGameData(game: Game): Observable<any> {
    return this.http.post("/newGame", game)
    .pipe(map(res => res.json()), catchError(err => of(err)));
  }

  logout(user: User): void {}
}
