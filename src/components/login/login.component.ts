import { Component, ViewChild } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';

import { BackendService } from '../../services/backend.service';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less']
})
export class LoginComponent {

  loadingURL = false;

  constructor(private snackBar: MatSnackBar,
              //@Inject() private backend: BackendService,
              private router: Router) {
  }

  @ViewChild('username') private username;
  @ViewChild('password') private password;

  submitLogin(event): void {
    // Temporary workaround till login service is implemented
    this.router.navigate(['/create-game']);
    if (event instanceof KeyboardEvent && event.keyCode !== 13) return; // keyCode 13: Enter key
    if (this.username && this.password) {
      this.loadingURL = true;
      //this.backend.login(this.username.nativeElement.value, this.password.nativeElement.value);
    } else {
      this.snackBar.open('Sie haben keine Benutzerdaten eingegeben!', 'Bitte erneut versuchen!');
      this.loadingURL = false;
    }
  }

}
