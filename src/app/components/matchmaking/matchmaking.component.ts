import { Component, OnInit, NgZone, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { io } from 'socket.io-client';
import { UserData } from 'src/app/models/user-data';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-matchmaking',
  templateUrl: './matchmaking.component.html',
  styleUrls: ['./matchmaking.component.scss']
})
export class MatchmakingComponent implements OnInit, OnDestroy {

  socket = io("http://192.168.1.2:2112");
  user: UserData | null;
  inQueue: boolean = false;
  queueSize: number = 0
  constructor(private _ngZone: NgZone, private router: Router, private userService: UserService) { }

  ngOnInit(): void {
    this.userService.currentUser.subscribe(x => {this.user = x, this.checkExistingGameAndRedirect()});
    this.userService.verifyUser().subscribe( x=> console.log(x));
    this.socket.on('new-match', param => {
      this._ngZone.runOutsideAngular(() => {
          this._ngZone.run(() => { this.navigateToGame(param) });
      });
      
    })
  }

  navigateToGame(param:any){ 
    this.router.navigate(['/game'], { queryParams: {roomId: param.roomId}, replaceUrl: true});
  }

  joinQueue(): void {
    this.checkExistingGameAndRedirect();
    this.userService.getUserById(this.user.id).subscribe(x => {
      console.log(x.rating);
      this.socket.emit("join-queue",  { rating : x.rating , userId: this.user.id }, response =>{
        this.queueSize = response.queueLength;
      } );
    })


    this.inQueue = true;
  }

  leaveQueue(): void {
    this.socket.emit("leave-queue");
    this.inQueue = false;
  }

  checkExistingGameAndRedirect(): void {
    this.socket.emit("check-existing", {userId: this.user.id}, response =>{
      this.router.navigate(['/game'], { queryParams: {roomId: response.id}});
    })
  }


  ngOnDestroy(): void {
      console.log(`Closed socket: ${this.socket.id}`)
      this.socket.close();
  }

}
