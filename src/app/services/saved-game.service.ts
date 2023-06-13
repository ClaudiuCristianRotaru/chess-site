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
    return this.http.get<SavedGameData[]>(`http://localhost:3000/saved-game/user/${username}?page=${page}&pageSize=${pageSize}`).pipe(map(savedGames => {
      return savedGames;
    }));
  }

  addUserSavedGame(gameId: string, username: string, note: string) {
    return this.http.post<SavedGameData>(`http://localhost:3000/saved-game`, {username: username, game_id: gameId, note: note }).pipe(map(savedGame => {
      return savedGame;
    }));
  }

  getUserSavedGamesCount(username:string) {
    return this.http.get<number>(`http://localhost:3000/saved-game/user/${username}/count`).pipe(map(count => {
      return count;
    }));
  }

  removeUserSavedGame(savedGameId: string){
    return this.http.delete<any>(`http://localhost:3000/saved-game/id/${savedGameId}`).pipe(map(count => {
      return count;
    }));
  }

  getUserSavedGame(gameId: string, username: string) {
    console.log("yo");
    return this.http.get<SavedGameData>(`http://localhost:3000/saved-game/${gameId}/user/${username}`,).pipe(map(savedGame => {
      return savedGame;
    }));
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

