import { Component, HostListener, OnInit } from '@angular/core';
import { GameData } from 'src/app/models/game-data';
import { GameService } from '../../services/game.service';
import { ActivatedRoute } from '@angular/router';
import { ChessGame } from 'src/chess-model/ChessGame';
import { IPiece } from 'src/chess-model/pieces/IPiece';
import { GameParams } from 'src/chess-model/GameParams';
import { SavedGameService } from 'src/app/services/saved-game.service';
import { UserService } from 'src/app/services/user.service';
import { UserData } from 'src/app/models/user-data';

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
  isSaved: boolean;
  user: UserData | null;
  constructor(private activatedRoute: ActivatedRoute, private gameService: GameService, private savedGameService: SavedGameService, private userService: UserService) { }

  ngOnInit(): void {
    this.userService.currentUser.subscribe(x => this.user = x);
    let idParam = this.activatedRoute.snapshot.paramMap.get('id');
    this.gameService.getGame(idParam).subscribe({
      next: (x) => {
        this.gameData = x;
        this.gamePositions = JSON.parse(this.gameData.FENS);
        this.refresh();
      },
      error: (x) => console.error(x)
    });
    this.savedGameService.getUserSavedGame(idParam, this.user.username).subscribe(res =>{
      this.isSaved = !!res;
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
    var audio = new Audio('./assets/move.mp3');
    audio.play();
    this.refresh();
  }

  prev() : void {
    if (this.index <= 0) return;
    this.index--;
    var audio = new Audio('./assets/move.mp3');
    audio.play();
    this.refresh();
  }

  flipBoard() : void {
    this.whitePov = !this.whitePov;
    this.refresh();
  }

  save(note: string){ 
    console.log(note);
    this.isSaved = !this.isSaved;
    this.savedGameService.addUserSavedGame( this.gameData.id, this.user.username, note).subscribe();
  }

  unsave(){
    this.isSaved = !this.isSaved;
    this.savedGameService.getUserSavedGame(this.gameData.id, this.user.username).subscribe(res => {
      console.log(res);
      this.savedGameService.removeUserSavedGame(res.id).subscribe();
    })
   
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
