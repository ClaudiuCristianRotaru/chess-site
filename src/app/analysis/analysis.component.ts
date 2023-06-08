import { Component, OnInit } from '@angular/core';
import { GameData } from 'src/app/models/game-data';
import { GameService } from '../services/game.service';
import { ActivatedRoute } from '@angular/router';
import { ChessGame } from 'src/chess-model/ChessGame';
import { IPiece } from 'src/chess-model/pieces/IPiece';
import { GameParams } from 'src/chess-model/GameParams';

@Component({
  selector: 'app-analysis',
  templateUrl: './analysis.component.html',
  styleUrls: ['./analysis.component.scss']
})
export class AnalysisComponent implements OnInit {
  index: number = 0;
  game: ChessGame = new ChessGame();
  gameData: GameData;
  gamePositions: string[] = [];
  pieces: { piece: IPiece, class: string }[] = [];
  color: string = "black";
  constructor(private activatedRoute: ActivatedRoute, private gameService: GameService) { }

  ngOnInit(): void {
    let idParam = this.activatedRoute.snapshot.paramMap.get('id');
    console.log(idParam)
    this.gameService.getGame(idParam).subscribe({
      next: (x) => {
        this.gameData = x;
        this.gamePositions = JSON.parse(this.gameData.FENS);
        this.refresh();
      },
      error: (x) => console.log(x)
    });
  }

  refresh(): void {
    this.pieces = [];
    this.game.gameParams = new GameParams();
    this.game.setupFromFEN(this.gamePositions[this.index]);
    this.game.setupBoard();
    this.linkPieces();
  }

  linkPieces(): void {
    if (this.color == "") return;
    this.game.gameParams.whitePieces.forEach(piece => {
      this.pieces.push({ 
        piece: piece, 
        class: `piece ${piece.class} row${piece.row} col${piece.col} ${this.color == "white" ? "" : "inverted"}` })
    })
    this.game.gameParams.blackPieces.forEach(piece => {
      this.pieces.push({ 
        piece: piece,
        class: `piece ${piece.class} row${piece.row} col${piece.col} ${this.color == "white" ? "" : "inverted"}` })
    })
  }

  next() : void {
    if (this.index >= this.gamePositions.length  - 1) return;
    this.index++;
    this.refresh()
  }

  prev() : void {
    if (this.index <= 0) return;
    this.index--;
    this.refresh();
  }
}
