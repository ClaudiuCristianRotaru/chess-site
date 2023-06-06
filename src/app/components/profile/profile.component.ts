import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { GameData } from 'src/app/models/game-data';
import { UserData } from 'src/app/models/user-data';
import { UserService } from 'src/app/services/user.service';
import { GameService } from 'src/app/services/game.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  user?: UserData | null;
  pastGames: BehaviorSubject<GameData[]>;
  constructor(private activatedRoute:ActivatedRoute,
     private router: Router,
     private userService:UserService,
     private gameService:GameService) { }

  ngOnInit(): void {
    let usernameParam = this.activatedRoute.snapshot.paramMap.get('username');
    this.userService.getUserByUsername(usernameParam).subscribe({
      next: (x) => {this.user = x, this.fetchPastGames(); }, 
      error: (x) => this.router.navigate(['notfound'])});
  };
  
  fetchPastGames() {
    this.gameService.getUserGames(this.user.username).subscribe({
      next: (x) => { this.pastGames = new BehaviorSubject<GameData[]>(x); }, 
      error: (x) => console.log(x)})
  }
}
