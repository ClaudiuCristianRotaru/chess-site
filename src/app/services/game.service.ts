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
    return this.http.get<GameData[]>('http://localhost:3000/game/games').pipe(map(game => {
      return game;
    }));
  }

  getUserGames(username:string, query:string){
    return this.http.get<GameData[]>(`http://localhost:3000/game/user/${username}${query}`).pipe(map(game => {
      return game;
    }));
  }

  getGame(id: string) {
    return this.http.get<GameData>(`http://localhost:3000/game/${id}`).pipe(map(game => {
      return game;
    }));
  }

  getUserGamesCount(username:string) {
    return this.http.get<number>(`http://localhost:3000/game/user/${username}/count`).pipe(map(count => {
      return count;
    }));
  }
}

