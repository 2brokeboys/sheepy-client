import { Component, Pipe, PipeTransform } from '@angular/core';
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
    if (!gameType || !schwarz || !points || !runners || !virgins || !gameType.value) {
      this.snackBar.open("Bitte überprüfen Sie, ob Ihre Eingaben vollständig sind.", "", {duration: 3000});
    }

    // TODO: client-side validation here (server already does validation with meaningfull messages)
    // also, we only need to do validation a this point, that is not caught via the UI
    // (i.e. by disabling buttons)

    const game: Game = {
      participants: this.players.map(p => p.id),
      player: this.player === undefined ? -1 : this.player,
      playmate: this.playmate === undefined ? -1 : this.playmate,
      gameType: (<any>GameType)[gameType.value],
      schwarz: schwarz.checked,
      points: +points.value,
      runners: runners.value,
      virgins: virgins.value
    };

    if (game.gameType == GameType.Ramsch) {
      game.runners = -1;
    } else {
      game.virgins = -1;
    }

    // TODO: this could theoretically be 0 aswell
    if (game.schwarz) {
      game.points = 120;
    }
    this.backend.sendGameData(game).subscribe(res => {
      if (res.success) {
        this.resetForm(gameType, schwarz, points, runners, virgins);
        this.snackBar.open("Erfolgreich abgesendet.", "", {duration: 3000})
        return;
      }
      if (res.error == "invalid data") {
        this.snackBar.open("Fehler im Programm, bitte Entwickler benachrichtigen. (-12329)", "", {duration: 3000});
        return;
      }
      if (res.error == "invalid game")  {
        if(!res.messages) {
          this.snackBar.open("Fehler im Programm, bitte Entwickler benachrichtigen. (-32453)", "", {duration: 3000});
          return;
        }
        this.snackBar.open("Eingabefehler: " + res.messages.join(" "), "", {duration: 3000});
        return;
      }
      this.snackBar.open("Fehler im Programm, bitte Entwickler benachrichtigen. (-80273)", "", {duration: 3000})
    });
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

  /** Clears all inputs */
  resetForm(gameType, schwarz, points, runners, virgins) {
    this.player = undefined;
    this.playmate = undefined;
    this.buttonsDisabled = [false, false, false, false];
    
    gameType.value = 0;
    schwarz.checked = false;
    points.value = "";
    runners.value = 0;
    virgins.value = 0;
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
