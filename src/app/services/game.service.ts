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
    return this.http.get<GameData[]>('http://localhost:3000/game/games');
  }

  getTopGames(){
    return this.http.get<GameData[]>(`http://localhost:3000/game/games/top`);
  }

  getUserGames(username:string, page :number, pageSize: number){
    return this.http.get<GameData[]>(`http://localhost:3000/game/user/${username}?page=${page}&pageSize=${pageSize}`);
  }

  getGame(id: string) {
    return this.http.get<GameData>(`http://localhost:3000/game/${id}`);
  }

  getUserGamesCount(username:string) {
    return this.http.get<number>(`http://localhost:3000/game/user/${username}/count`);
  }
}

