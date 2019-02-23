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

import { AppComponent } from './app.desktop.component';
import { LoginComponent } from './login/login.component';
import { CreateGameComponent } from './create-game/create-game.component';
import { PageNotFoundComponent } from './pagenotfound/pagenotfound.component';

import { BackendService } from '../services/backend.service';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
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
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
