import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';

import { User, Game } from '../../datatypes/datatypes';

import { SessionService } from '../../services/session.service';
import { BackendService } from '../../services/backend.service';

@Component({
  selector: 'create-game',
  templateUrl: './create-game.component.html',
  styleUrls: ['./create-game.component.less']
})
export class CreateGameComponent {

  users: User[] = [];
  players: User[];
  recentGames: Game[];

  constructor(private snackBar: MatSnackBar, private session: SessionService, private backend: BackendService, private router: Router) {
    this.session.getUsers('', (users: User[]) => this.users = users);
    this.backend.getRecentGames().subscribe((res) => this.recentGames = res.recentGames);
  }

  /** Loads game with selected players */
  loadGame(...players: any[]): void {
    this.backend.getUserByName(players[0].value).subscribe(res1 => {
      if (!res1.user) {
        this.snackBar.open("Der Benutzer '" + players[0].value + "' existiert nicht.");
        return;
      }
      this.backend.getUserByName(players[1].value).subscribe(res2 => {
        if (!res2.user) {
          this.snackBar.open("Der Benutzer '" + players[1].value + "' existiert nicht.");
          return;
        }
        this.backend.getUserByName(players[2].value).subscribe(res3 => {
          if (!res3.user) {
            this.snackBar.open("Der Benutzer '" + players[2].value + "' existiert nicht.");
            return;
          }
          this.backend.getUserByName(players[3].value).subscribe(res4 => {
            if (!res4.user) {
              this.snackBar.open("Der Benutzer '" + players[3].value + "' existiert nicht.");
              return;
            }
            this.players = [res1.user, res2.user, res3.user, res4.user];

            this.session.setPlayers(this.players);
            this.router.navigate(['/submit-game']);
          });
        });
      });
    });
  }

  /** Creates game with given players */
  createGame(event: Event, ...players: any[]): void {
    if (event instanceof KeyboardEvent && event.keyCode !== 13) return; // keyCode 13: Enter key
    for (let p of players) {
      if (!p || !p.value) {
        this.snackBar.open("Bitte füllen Sie alle Felder aus.");
      }
    }
    for (let i: number = 0; i < players.length; i++) {
      for (let j: number = i+1; j < players.length; j++) {
        if (players[i].value === players[j].value) {
          this.snackBar.open("Ein Benutzer kann nur einmal eingegeben werden.");
          return;
        }
      }
    }
    this.loadGame(...players);
  }

  userChange(searchString: string): void {
    this.session.getUsers(searchString, (users: User[]) => this.users = users);
  }
}
