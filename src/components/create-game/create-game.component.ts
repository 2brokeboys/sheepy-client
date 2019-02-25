import { Component, ViewChild } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';

import { User } from '../../datatypes/datatypes';

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
  
  constructor(private snackBar: MatSnackBar, private session: SessionService, private backend: BackendService, private router: Router) {
    this.users = this.session.getUsers('');
  }

  /** Creates game with given players */
  createGame(player1, player2, player3, player4): void {
    if (player1 && player2 && player3 && player4 && player1.value && player2.value && player3.value && player4.value) {
      this.players = [this.users.filter(player => player.username == player1.value)[0], 
          this.users.filter(player => player.username == player2.value)[0], 
          this.users.filter(player => player.username == player3.value)[0], 
          this.users.filter(player => player.username == player4.value)[0]];
      this.session.setPlayers(this.players);
      this.router.navigate(['/submit-game']);
    } else {
      this.snackBar.open("Bitte füllen Sie alle Felder aus.");
    }
  }

  userChange(searchString: string): void {
    this.users = this.session.getUsers(searchString);
  }
}
