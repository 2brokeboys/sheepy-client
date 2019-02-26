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
  player: number;
  playmate: number;
  buttonsDisabled: boolean[] = new Array(4);

  constructor(private snackBar: MatSnackBar, private backend: BackendService, private router: Router, private session: SessionService) {
    this.players = this.session.getPlayers();
  }

  /** Checks if provided information is correct and formats it correct */
  submitGame(event: Event, gameType, schwarz, points, runners, virgins): void {
    if (event instanceof KeyboardEvent && event.keyCode !== 13) return; // keyCode 13: Enter key
    if (gameType && schwarz && points && runners && virgins && gameType.value) {

      if (gameType.value == "Ramsch") {
        if (virgins.value) {
          if (virgins.value < 0 || virgins.value > 3) {
            this.snackBar.open("Bitte überprüfen Sie Ihre Eingaben auf Richtigkeit.");
            return;
          }
          const game: Game = {
            participants: this.players.map(p => p.id),
            player: this.player,
            playmate: this.playmate,
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
        if (points.value && points.value <= 120 && points.value >= 0 && schwarz.checked && runners.value && points.value) {
          if (points.value > 120 || points.value < 0 || runners.value > 14 || runners.value < 0) {
            this.snackBar.open("Bitte überprüfen Sie Ihre Eingaben auf Richtigkeit.");
            return;
          }
          const game: Game = {
            participants: this.players.map(p => p.id),
            player: undefined,//this.players.indexOf(player.value),
            playmate: undefined,//this.players.indexOf(playmate.value),
            gameType: (<any>GameType)[gameType.value],
            schwarz: schwarz.checked,
            points: schwarz.checked ? 120 : points.value,
            runners: runners.value,
            virgins: -1
          };
          this.backend.sendGameData(game);
          return;
        }
      }
    }
    this.snackBar.open("Bitte überprüfen Sie, ob Ihre Eingaben vollständig sind.");
  }

  changePlayers(button: number, event: any, ...buttons: any[]): void {
    let numChecked : number = 0;
    let checkedButton = undefined;
    buttons.forEach((b: any, index: number) => {
      if (b.checked) {
        numChecked++;
        checkedButton = index;
      }
    });
    switch(numChecked) {
      case 0:
        this.player = undefined;
        this.playmate = undefined;
        break;
      case 1:
        this.player = checkedButton;
        this.playmate = undefined;
        for(let i : number = 0; i < buttons.length; i++) {
          this.buttonsDisabled[i] = false;
        }
        break;
      case 2:
        this.playmate = button;
        for(let i : number = 0; i < buttons.length; i++) {
          this.buttonsDisabled[i] = !buttons[i].checked;
        }
        break;
      default:
        // This should not happen
    }
  }

  /** Returns the icon id of the gameType */
  getGameTypeIcon(gameType: string): string {
    //return 'gameType-' + gameType;
    // temporary till icons are created
    return 'impressum';
  }
}

@Pipe({
  name: 'gameTypeToArray'
})
export class GameTypeToArray implements PipeTransform {
  transform() {
    const keys = Object.keys(GameType);
    return keys.slice(keys.length / 2);
  }
}
