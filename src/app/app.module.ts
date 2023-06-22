import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavigationBarComponent } from './components/navigation-bar/navigation-bar.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { GameModule } from './components/game/game.module';
import { HomeModule } from './components/home/home.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatchmakingComponent } from './components/matchmaking/matchmaking.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { MatRadioModule } from '@angular/material/radio';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { JwtInterceptor } from './interceptors/jwt.interceptor';
import { RouterModule } from '@angular/router';
import { ProfileComponent } from './components/profile/profile.component';
import { AnalysisComponent } from './components/analysis/analysis.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { AnalysisModule } from './components/analysis/analysis.module';
import { GameEndedComponent } from './components/game/game-ended/game-ended.component';
import { MatButtonModule } from '@angular/material/button';
import { ProfileModule } from './components/profile/profile.module';
import { RegisterModule } from './components/register/register.module';
import { LoginModule } from './components/login/login.module';
import { MatchmakingModule } from './components/matchmaking/matchmaking.module';
import { NavigationBarModule } from './components/navigation-bar/navigation-bar.module';

const modules = [    
  GameModule,
  HomeModule,
  AnalysisModule,
  ProfileModule,
  RegisterModule,
  LoginModule,
  MatchmakingModule,
  NavigationBarModule ]

@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent,
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    modules
  ],
  providers: [{provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi:true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
