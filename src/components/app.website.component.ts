import { Component, ViewChild, ViewContainerRef } from '@angular/core';
import { MatSidenav, MatIconRegistry } from '@angular/material';
import { Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.website.component.html',
  styleUrls: ['./app.component.less'],
})
export class AppComponent {

  constructor(private router: Router,
    private iconRegistry: MatIconRegistry,
    private sanitizer: DomSanitizer) {
    this.registerSvgIcons();
  }

  registerSvgIcons() {
    this.iconRegistry.addSvgIcon('impressum', this.sanitizer.bypassSecurityTrustResourceUrl('assets/impressum.svg'));
    this.iconRegistry.addSvgIcon('logout', this.sanitizer.bypassSecurityTrustResourceUrl('assets/logout.svg'));
    this.iconRegistry.addSvgIcon('create-game', this.sanitizer.bypassSecurityTrustResourceUrl('assets/createVoting.svg'));
    this.iconRegistry.addSvgIcon('list-games', this.sanitizer.bypassSecurityTrustResourceUrl('assets/listVotings.svg'));
    this.iconRegistry.addSvgIcon('login', this.sanitizer.bypassSecurityTrustResourceUrl('assets/login.svg'));
    this.iconRegistry.addSvgIcon('remove-game', this.sanitizer.bypassSecurityTrustResourceUrl('assets/delete.svg'));
    this.iconRegistry.addSvgIcon('add', this.sanitizer.bypassSecurityTrustResourceUrl('assets/add.svg'));
    this.iconRegistry.addSvgIcon('user', this.sanitizer.bypassSecurityTrustResourceUrl('assets/user.svg'));
    
    // Used for desktop application
    this.iconRegistry.addSvgIcon('close', this.sanitizer.bypassSecurityTrustResourceUrl('assets/close.svg'));
    this.iconRegistry.addSvgIcon('maximize', this.sanitizer.bypassSecurityTrustResourceUrl('assets/maximize.svg'));
    this.iconRegistry.addSvgIcon('unmaximize', this.sanitizer.bypassSecurityTrustResourceUrl('assets/unmaximize.svg'));
  }
}
