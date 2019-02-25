import { Component, ViewChild } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';

import { BackendService } from '../../services/backend.service';
import { SessionService } from '../../services/session.service';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less']
})
export class LoginComponent {

  loadingURL = false;

  constructor(private snackBar: MatSnackBar,
              private backend: BackendService,
              private session: SessionService,
              private router: Router) {
    // Tests if user already logged in
    this.backend.sendLoginData("", "").subscribe(res => {
      if (res.status == 409) this.router.navigate(['/create-game']);
    });
  }

  @ViewChild('username') private username;
  @ViewChild('password') private password;

  submitLogin(event): void {
    if (event instanceof KeyboardEvent && event.keyCode !== 13) return; // keyCode 13: Enter key
    if (this.username && this.password && this.username.nativeElement.value && this.password.nativeElement.value) {
      this.loadingURL = true;
      this.backend.sendLoginData(this.username.nativeElement.value, this.password.nativeElement.value).subscribe(res => {
        if (res.status != 201 || res.status != 409) {
          this.snackBar.open("Der Benutzername oder das Passwort ist falsch.", "Bitte erneut versuchen!", { duration: 3000 });
          this.loadingURL = false;
          return;
        }
        this.session.openSession(res.user);
        this.router.navigate(['/create-game']);
      });
      return;
    }
    this.snackBar.open('Sie haben keine Benutzerdaten eingegeben!', 'Bitte erneut versuchen!', { duration: 3000 });
    this.loadingURL = false;
  }
}
