import { Component, OnInit, NgZone, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { io } from 'socket.io-client';
import { UserData } from 'src/app/models/user-data';
import { JwtService } from 'src/app/services/jwt.service';
import { UserService } from 'src/app/services/user.service';
import { GameService } from '../../services/game.service';

@Component({
  selector: 'app-matchmaking',
  templateUrl: './matchmaking.component.html',
  styleUrls: ['./matchmaking.component.scss']
})
export class MatchmakingComponent implements OnInit, OnDestroy {

  socket = io("http://192.168.1.2:2112");
  user: UserData | null;
  inQueue: boolean = false;
  constructor(private _ngZone: NgZone, private router: Router, private userService: UserService, private gameService: GameService) { }

  ngOnInit(): void {
    this.userService.currentUser.subscribe(x => {this.user = x, this.checkGameExists()});
    
    this.socket.on('new match', param => {
      console.log("matched with: " + param.opponentId);
      console.log("room: " + param.roomId );
      this._ngZone.runOutsideAngular(() => {
          this._ngZone.run(() => { this.navigateToGame(param) });
      });
      
    })
  }

  navigateToGame(param:any){ 
    this.router.navigate(['/game'], { queryParams: {roomId: param.roomId}});
  }

  joinQueue(): void {
    if(!this.user) {return;}
    this.checkGameExists();
    this.gameService.getAllGames().subscribe(res => {
      console.log(res)
    });
    console.log("joining queue");
    this.inQueue = true;
    this.socket.emit("joinqueue",  { rating : 1000 + Math.floor(Math.random()*100) , userId: this.user.id }, response =>{
      console.log(`Currently in queue ${response.queueLength}`)
    } );
  }

  leaveQueue(): void {
    this.socket.emit("leavequeue");
    this.inQueue = false;
  }

  checkGameExists(): void {
    this.socket.emit("checkexisting", {userId: this.user.id}, response =>{
      this.router.navigate(['/game'], { queryParams: {roomId: response.id}});
    })
  }


  ngOnDestroy(): void {
      console.log(`Closed socket: ${this.socket.id}`)
      this.socket.close();
  }

}
