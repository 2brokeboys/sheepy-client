import { Injectable } from '@angular/core';
import { User } from '../datatypes/datatypes';

import { BackendService } from './backend.service';

@Injectable()
export class SessionService {

  players: User[] = [];
  users: User[] = [];
  loggedInUser: User;

  constructor(private backend: BackendService) { }

  /** Returns the currently playing players */
  getPlayers(): User[] {
    return this.players;
  }

  /** Returns the currently logged in user */
  getLoggedInUser(): User {
    return this.loggedInUser;
  }

  /**
   * Sets the session data for the current session
   * @param loggedInUser Currently logged in user
   */
  openSession(loggedInUser: User): void {
    this.loggedInUser = loggedInUser;
  }

  /**
   * Adds new users got by the backend
   * @param users Users that are currently found
   */
  setUsers(users: User[]): void {
    if (!users) users = [];
    for (let user of users) {
      if (this.users.indexOf(user) === -1) this.users.push(user);
    }
  }

  /**
   * Gets all users matched by the string
   * @param searchString string by which the user should be searched
   */
  getUsers(searchString: string): User[] {
    let u = [];
    for (let user of this.users) {
      if (user.username.includes(searchString)) {
        u.push(user);
        continue;
      }
      if (user.name.includes(searchString)) u.push(user);
    }
    if (u.length < 5) {
      this.backend.getUsers(searchString).subscribe(res => {
        this.setUsers(res.users);
        return u;
      });
    } else {
      return u;
    }
  }

  setPlayers(players: User[]): void {
    this.players = players;
  }

  /** Remove session data */
  logout(): void {
    this.players = [];
    this.loggedInUser = undefined;
  }
}
