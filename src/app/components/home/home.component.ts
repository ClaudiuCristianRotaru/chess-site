import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { GameData } from 'src/app/models/game-data';
import { GameService } from '../../services/game.service';
import { UserData } from 'src/app/models/user-data';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  games: BehaviorSubject<GameData[]>;
  users: BehaviorSubject<UserData[]>;
  constructor(private gameService: GameService,private userService: UserService) { }

  ngOnInit(): void {
    this.gameService.getAllGames().subscribe(res =>{
      this.games = new BehaviorSubject<GameData[]>(res);
    });

    this.userService.getAllUsers().subscribe(res =>{
      this.users = new BehaviorSubject<UserData[]>(res);
    });
  }

}