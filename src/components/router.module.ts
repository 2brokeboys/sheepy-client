import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { CreateGameComponent } from './create-game/create-game.component';
import { SubmitGameComponent } from './submit-game/submit-game.component';
import { PageNotFoundComponent } from './pagenotfound/pagenotfound.component';

const appRoutes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'login', component: LoginComponent },
  { path: 'create-game', component: CreateGameComponent },
  { path: 'submit-game', component: SubmitGameComponent },
  //{ path: 'game', component: RecipesComponent, canActivate: [SessionService] },
  //{ path: 'create', component: AddRecipeComponent, canActivate: [SessionService] },
  //{ path: 'stats', component: AddRecipeComponent, canActivate: [SessionService] },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
