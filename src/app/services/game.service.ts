import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { GameData } from '../models/game-data';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  constructor(private http:HttpClient) { }

  getAllGames(){
    //this.http.post<GameData>('http://localhost:3000/game', {result: "white", FENS:"123", chat_logs: "fuck", white_id: "1ef301b7-e3a5-4ced-b8c9-06d5eac25a04", black_id: "2a171d26-7eae-4473-ac9b-daefc942aaa2"}).subscribe(x => console.log(x));
    return this.http.get<GameData[]>('http://localhost:3000/game/games').pipe(map(game => {
      console.log(game);
      return game;
    }));
  }

  getUserGames(username:string, query:string){
    return this.http.get<GameData[]>(`http://localhost:3000/game/user/${username}${query}`).pipe(map(game => {
      console.log(game);
      return game;
    }));
  }

  getGame(id: string) {
    return this.http.get<GameData>(`http://localhost:3000/game/${id}`).pipe(map(game => {
      console.log(game);
      return game;
    }));
  }

  getUserGamesCount(username:string) {
    return this.http.get<number>(`http://localhost:3000/game/user/${username}/count`).pipe(map(count => {
      console.log(count);
      return count;
    }));
  }
}

