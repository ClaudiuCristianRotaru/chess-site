import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, take } from 'rxjs';
import { GameData } from 'src/app/models/game-data';
import { GameService } from '../../services/game.service';
import { UserData } from 'src/app/models/user-data';
import { UserService } from 'src/app/services/user.service';
import { SavedGameService } from 'src/app/services/saved-game.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  games: GameData[];
  users: {index: number, userData: UserData}[];
  constructor(private gameService: GameService,private userService: UserService) { }

  ngOnInit(): void {
    this.gameService.getTopGames().pipe(take(1)).subscribe(res =>{
      this.games = res;
    });

    this.userService.getAllUsers().pipe(take(1)).subscribe(res =>{ 
      this.users = res;
    });
  }

}
