import { Component, ViewChild, Pipe, PipeTransform } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';

import { User, GameType, Game } from '../../datatypes/datatypes';
import { BackendService } from '../../services/backend.service';
import { SessionService } from '../../services/session.service';

@Component({
  selector: 'submit-game',
  templateUrl: './submit-game.component.html',
  styleUrls: ['./submit-game.component.less']
})
export class SubmitGameComponent {

  players: User[];
  
  constructor(private snackBar: MatSnackBar, private backend: BackendService, private router: Router, private session: SessionService) {
    this.players = this.session.getPlayers();
  }

  /** Checks if provided information is correct and formats it correct */
  submitGame(player, playmate, gameType, schwarz, points, runners, virgins) {
    console.log(typeof player);
    
    if (player && playmate && gameType && schwarz && points && runners && virgins && player.value && playmate.value && gameType.value) {
      if (gameType.value == "Ramsch") {
        if (virgins.value) {
          if (virgins.value < 0 || virgins.value > 3) {
            this.snackBar.open("Bitte überprüfen Sie Ihre Eingaben auf Richtigkeit.");
            return;
          }
          const game: Game = {
            participants: this.players.map(p => p.id),
            player: this.players.map(p => p.username).indexOf(player.value),
            playmate: this.players.map(p => p.username).indexOf(playmate.value),
            gameType: (<any>GameType)[gameType.value],
            schwarz: false,
            points: 0,
            runners: -1,
            virgins: virgins.value
          };
          this.backend.sendGameData(game);
          console.log(game);
          return;
        }
      } else {
        if (points.value && points.value <= 120 && points.value >= 0 && schwarz.value && runners.value && points.value) {
          if (points.value > 120 || points.value < 0 || runners.value > 14 || runners.value < 0) {
            this.snackBar.open("Bitte überprüfen Sie Ihre Eingaben auf Richtigkeit.");
            return;
          }
          const game: Game = {
            participants: this.players.map(p => p.id),
            player: this.players.indexOf(player.value),
            playmate: this.players.indexOf(playmate.value),
            gameType: (<any>GameType)[gameType.value],
            schwarz: schwarz.value,
            points: points.value,
            runners: runners.value,
            virgins: -1
          };
          this.backend.sendGameData(game);
          console.log(game);
          return;
        }
      }
    }
    this.snackBar.open("Bitte überprüfen Sie, ob Ihre Eingaben vollständig sind.");
  }
}

@Pipe({
  name: 'gameTypeToArray'
})
export class GameTypeToArray implements PipeTransform {
  transform() {
    const keys = Object.keys(GameType);
    console.log(keys);
    return keys.slice(keys.length / 2);
  }
}
