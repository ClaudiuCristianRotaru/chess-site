import { Injectable } from '@angular/core';
import { ChessGame } from 'src/chess-model/ChessGame';

@Injectable({
  providedIn: 'root'
})
export class GameService {
  game: ChessGame = new ChessGame();
  constructor() { }

  
}
