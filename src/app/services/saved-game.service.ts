import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { GameData } from '../models/game-data';
import { SavedGameData } from '../models/saved-game-data';

@Injectable({
  providedIn: 'root'
})
export class SavedGameService {

  constructor(private http:HttpClient) { }

  getUserSavedGames(username:string, page :number, pageSize: number){
    return this.http.get<SavedGameData[]>(`http://localhost:3000/saved-game/user/${username}?page=${page}&pageSize=${pageSize}`);
  }

  addUserSavedGame(gameId: string, username: string, note: string) {
    return this.http.post<SavedGameData>(`http://localhost:3000/saved-game`, {username: username, game_id: gameId, note: note });
  }

  getUserSavedGamesCount(username:string) {
    return this.http.get<number>(`http://localhost:3000/saved-game/user/${username}/count`);
  }

  removeUserSavedGame(savedGameId: string){
    return this.http.delete<any>(`http://localhost:3000/saved-game/id/${savedGameId}`);
  }

  getUserSavedGame(gameId: string, username: string) {
    return this.http.get<SavedGameData>(`http://localhost:3000/saved-game/${gameId}/user/${username}`,);
  }




//   getGame(id: string) {
//     return this.http.get<GameData>(`http://localhost:3000/game/${id}`).pipe(map(game => {
//       return game;
//     }));
//   }

//   getUserGamesCount(username:string) {
//     return this.http.get<number>(`http://localhost:3000/game/user/${username}/count`).pipe(map(count => {
//       return count;
//     }));
//   }
}

