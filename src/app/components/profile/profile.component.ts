import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { GameData } from 'src/app/models/game-data';
import { UserData } from 'src/app/models/user-data';
import { UserService } from 'src/app/services/user.service';
import { GameService } from 'src/app/services/game.service';
import { SavedGameData } from 'src/app/models/saved-game-data';
import { SavedGameService } from 'src/app/services/saved-game.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  user?: UserData | null;
  pastGames: GameData[];
  pastGamesCount: number;

  savedGames: SavedGameData[];
  pastSavedGamesCount: number;

  constructor(private activatedRoute:ActivatedRoute,
     private router: Router,
     private userService:UserService,
     private gameService:GameService,
     private savedGameService:SavedGameService) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(val => {
      this.userService.getUserByUsername(val['username']).subscribe({
        next: (x) => {this.user = x, this.fetchData();}, 
        error: (x) => this.router.navigate(['notfound'])});
    })

  }
  
  fetchPastGames(query) {
    this.gameService.getUserGames(this.user.username, query).subscribe({
      next: (x) => { this.pastGames = x; }, 
      error: (x) => console.error(x)})
  }

  fetchGamesCount() {
    this.gameService.getUserGamesCount(this.user.username).subscribe({
      next: (x) => { this.pastGamesCount = x; }, 
      error: (x) => console.error(x)})
  }

  fetchSavedGames(query) {
    this.savedGameService.getUserSavedGames(this.user.username, query ).subscribe({
      next: (x) => { this.savedGames = x; console.log(this.savedGames)},
      error: (x) => console.error(x)})
  }

  fetchSavedGamesCount() {
    this.savedGameService.getUserSavedGamesCount(this.user.username).subscribe({
      next: (x) => { this.pastSavedGamesCount = x; }, 
      error: (x) => console.error(x)})
  }


  fetchData() {;
    this.fetchPastGames(`?page=0`);
    this.fetchGamesCount();
    this.fetchSavedGames(`?page=0`);
    this.fetchSavedGamesCount();
  }

  handlePageEvent($event){
    this.fetchPastGames(`?page=${$event.pageIndex}`);
  }
}
