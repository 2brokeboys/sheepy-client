import { Component, ViewChild } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';

import { User } from '../../datatypes/datatypes';
import { BackendService } from '../../services/backend.service';

@Component({
  selector: 'create-game',
  templateUrl: './create-game.component.html',
  styleUrls: ['./create-game.component.less']
})
export class CreateGameComponent {

  users: User[] = [{ id: 1, name: "Paul der geile Hengst", username: "HappyDayHunter"}, { id: 2, name: "Just", username: "us"}];
  players: User[];
  
  constructor(private snackBar: MatSnackBar, private backend: BackendService, private router: Router) {
    //this.backend.getUsers().subscribe(users => this.users = users);
  }

  createGame(player1, player2, player3, player4) {
    if (player1 && player2 && player3 && player4 && player1.value && player2.value && player3.value && player4.value) {
      this.players = [this.users.filter(player => player.username == player1.value)[0], 
          this.users.filter(player => player.username == player2.value)[0], 
          this.users.filter(player => player.username == player3.value)[0], 
          this.users.filter(player => player.username == player4.value)[0]];
    } else {
      this.snackBar.open("Fuck you bastard. Give me all your information.");
    }
  }
}
