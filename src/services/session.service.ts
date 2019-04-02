import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../datatypes/datatypes';

import { BackendService } from './backend.service';

@Injectable()
export class SessionService {

  participants: User[] = [];
  users: User[] = [];
  loggedInUser: User;

  constructor(private backend: BackendService, private router: Router) { }

  /** Returns the currently playing players */
  getPlayers(): User[] {
    return this.participants;
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
    if (!users) return;
    for (let user of users) {
      if (!this.hasUser(user)) this.users.push(user);
    }
  }

  /**
   * Check if user is in the cache
   */
  hasUser(user: User): boolean {
    for (let u of this.users) {
      if(u.id === user.id) {
        return true;
      }
    }
    return false;
  }

  /**
   * Gets all users matched by the string
   * @param searchString string by which the user should be searched
   */
  getUsers(searchString: string, callback): void {
    let u = [];
    if (searchString === '') {
      u = this.users;
    } else {
      for (let user of this.users) {
        if (user.username.toLowerCase().includes(searchString.toLowerCase())) {
          if (u.indexOf(user) === -1) u.push(user);
          continue;
        }
        if (user.name.toLowerCase().includes(searchString.toLowerCase()) && u.indexOf(user) === -1) u.push(user);
      }
    }
    if (searchString !== '' && u.length < 5) {
      this.backend.getUsers(searchString).subscribe(res => {
        this.setUsers(res.users);
        callback(u);
      });
    } else {
      callback(u);
    }
  }

  setPlayers(players: User[]): void {
    this.participants = players;
  }

  /** Remove session data */
  logout(): void {
    this.backend.logout(this.loggedInUser).subscribe(res => {
      if(!res.success) {
        console.error("ERROR");
        return;
      }
      this.participants = [];
      this.loggedInUser = undefined;
      this.router.navigate(['/login']);
    });
  }
}
