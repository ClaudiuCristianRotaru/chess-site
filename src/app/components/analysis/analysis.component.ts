import { Component, HostListener, OnInit } from '@angular/core';
import { GameData } from 'src/app/models/game-data';
import { GameService } from '../../services/game.service';
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
  whitePov: boolean = true;
  constructor(private activatedRoute: ActivatedRoute, private gameService: GameService) { }

  ngOnInit(): void {
    let idParam = this.activatedRoute.snapshot.paramMap.get('id');
    this.gameService.getGame(idParam).subscribe({
      next: (x) => {
        this.gameData = x;
        this.gamePositions = JSON.parse(this.gameData.FENS);
        this.refresh();
      },
      error: (x) => console.error(x)
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
    this.game.gameParams.whitePieces.forEach(piece => {
      this.pieces.push({ 
        piece: piece, 
        class: `piece ${piece.class} row${piece.row} col${piece.col} ${this.whitePov ? "" : "inverted"}` })
    })
    this.game.gameParams.blackPieces.forEach(piece => {
      this.pieces.push({ 
        piece: piece,
        class: `piece ${piece.class} row${piece.row} col${piece.col} ${this.whitePov ? "" : "inverted"}` })
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

  flipBoard() : void {
    this.whitePov = !this.whitePov;
    this.refresh();
  }

  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent): void {
     if(event.key == "ArrowRight") {
      this.next();
      return;
     } 
     if(event.key == "ArrowLeft") {
      this.prev();
      return;
     }
  }
}
