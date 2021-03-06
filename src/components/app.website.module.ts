import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FlexLayoutModule } from '@angular/flex-layout';

import { MaterialModule } from './material.module';

import { env } from '../environment';

import { AppRoutingModule } from './router.module';

import { AppComponent } from './app.website.component';
import { LoginComponent } from './login/login.component';
import { CreateGameComponent } from './create-game/create-game.component';
import { SubmitGameComponent, GameTypeToArray } from './submit-game/submit-game.component';
import { PageNotFoundComponent } from './pagenotfound/pagenotfound.component';

import { BackendService } from '../services/backend.service';
import { SessionService } from '../services/session.service';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    GameTypeToArray,
    SubmitGameComponent,
    CreateGameComponent,
    PageNotFoundComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpModule,
    CommonModule,
    HttpClientModule,
    FlexLayoutModule,
    MaterialModule,
    AppRoutingModule
  ],
  providers: [
    BackendService,
    GameTypeToArray,
    SessionService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
