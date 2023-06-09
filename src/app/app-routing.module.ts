import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { HomeComponent } from './components/home/home.component';
import { ProfileComponent } from './components/profile/profile.component';
import { MatchmakingComponent } from './components/matchmaking/matchmaking.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { AuthGuard } from './guards/auth.guard';
import { LoggedInGuard } from './guards/logged-in.guard';
import { AnalysisComponent } from './components/analysis/analysis.component';
import { GameComponent } from './components/game/game.component';

const routes: Routes = [  
{ path: '', redirectTo:'/home', pathMatch:'full' },
{ path: 'home', component:HomeComponent},
{ path: 'profile/:username', component:ProfileComponent},
{ path: 'analysis/:id', component:AnalysisComponent},
{ path: 'matchmaking', component:MatchmakingComponent, canActivate: [AuthGuard]},
{ path: 'login', component:LoginComponent, canActivate: [LoggedInGuard]},
{ path: 'register', component:RegisterComponent, canActivate: [LoggedInGuard]},
{ path: 'game', component: GameComponent},
{ path: 'notfound', component: PageNotFoundComponent },
{ path: '**', component: PageNotFoundComponent }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
