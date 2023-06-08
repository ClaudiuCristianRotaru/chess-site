import { Component, NgZone, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { io } from 'socket.io-client';
import { ChessGame } from 'src/chess-model/ChessGame';
import { IPiece } from 'src/chess-model/pieces/IPiece';
import { HttpClient } from '@angular/common/http';
import { CdkDragEnd, CdkDragStart } from '@angular/cdk/drag-drop';
import { Pawn } from 'src/chess-model/pieces/Pawn';
import { UserService } from 'src/app/services/user.service';
import { UserData } from 'src/app/models/user-data';
@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit, OnDestroy {
  socket = io("http://192.168.1.2:2112");
  game: ChessGame = new ChessGame();
  constructor(private http: HttpClient, private router: ActivatedRoute, private _zone: NgZone, private userService: UserService) { }
  pieces: {piece:IPiece,class: string,pos: { x: number, y: number }}[] = [];
  possibleMoves: string[] = [];
  gameId: string = "";
  color: string = "";
  promotionDialogVisible: boolean = false;
  moveInWaiting : any;
  user: UserData;
  ngOnInit(): void {
    this.userService.currentUser.subscribe(x => this.user = x);
    this.router.queryParams.subscribe((params) => {
      let obj = { id: params['roomId'] };
      this.gameId = obj.id;
    })
    let uid = this.user ? this.user.id : null;

    this.socket.emit("join-room", { room: this.gameId, uid: uid }, (response: any) => {
      this.color = response.color;
      this.game.setupFromFEN(response.FEN);
      this.game.setupBoard();
      this.game.calculateMoves();
      this.game.gameParams.pastPositions = response.pastPositions;
      console.log(this.game.gameParams);
      this.linkPieces();
    });

    this.socket.on("new move", params => {
      this._zone.run(() => {
        if(params.promotion){
          this.game.nextStep([params.startY, params.startX, params.endY, params.endX],params.promotion);}
        else{
          this.game.nextStep([params.startY, params.startX, params.endY, params.endX])
        }
        this.linkPieces();
      })

    })

    this.socket.on("gameended", params => {
      console.log(params)
    })

    console.log(this.pieces);

  }

  linkPieces(): void {
    this.pieces = [];
    if (this.color == "") return;
    this.game.gameParams.whitePieces.forEach(piece => {
      let uiPos = this.color == "white" ? { x: piece.col * 100, y: 700 - piece.row * 100 } : { x: 700 - piece.col * 100, y: piece.row * 100 };
      this.pieces.push({piece: piece,class: `piece ${piece.class}`, pos: uiPos})
    })
    this.game.gameParams.blackPieces.forEach(piece => {
      let uiPos = this.color == "white" ? { x: piece.col * 100, y: 700 - piece.row * 100 } : { x: 700 - piece.col * 100, y: piece.row * 100 };
      this.pieces.push({piece: piece, class: `piece ${piece.class}`, pos: uiPos})
    })
  }

  draggingIndex: number = -1;

  getPiece($event: CdkDragStart) {
    this.promotionDialogVisible=false;
    let x = $event.source.freeDragPosition;
    for (let i = 0; i < this.pieces.length; i++) {
      if (x == this.pieces[i].pos) {
        this.draggingIndex = i;
        this.pieces[this.draggingIndex].piece.possibleMoves.forEach(move => {
          this.possibleMoves.push(`highlight row${move.endPosition[0]} col${move.endPosition[1]} ${this.color == "black" ? "inverted" : ""}`)
        })
      }
    }

  }

  releasePiece($event: CdkDragEnd) {
    if (this.draggingIndex == undefined) return;
    if (this.color == "spectator") {
      this.resetDraggedPiece($event);
      return
    };
    let possibleIndexes: { x: number, y: number }[] = [];
    this.pieces[this.draggingIndex].piece.possibleMoves.forEach(move => {
      let x = (this.color == 'white') ? { x: move.endPosition[1], y: move.endPosition[0] } : { x: move.endPosition[1], y: move.endPosition[0] }
      possibleIndexes.push(x);
    })

    let droppedIndex = (this.color == 'white') ?
      { x: Math.round($event.source.getFreeDragPosition().x / 100), y: 7 - Math.round($event.source.getFreeDragPosition().y / 100) } :
      { x: 7 - Math.round($event.source.getFreeDragPosition().x / 100), y: Math.round($event.source.getFreeDragPosition().y / 100) }
    let found: boolean = false;
    possibleIndexes.forEach(index => {
      if (JSON.stringify(index) == JSON.stringify(droppedIndex)) {
        found = true;
      }
    })


    if (found) {
      this.pieces[this.draggingIndex].pos = {
        x: Math.round($event.source.getFreeDragPosition().x / 100) * 100,
        y: Math.round($event.source.getFreeDragPosition().y / 100) * 100
      };
      if ((this.pieces[this.draggingIndex].piece.isWhite == true && this.color == 'black') ||
        (this.pieces[this.draggingIndex].piece.isWhite == false && this.color == 'white')) {
        console.log("Opponent's piece!");
        this.resetDraggedPiece($event);
        return;
      }
      if (this.game.gameParams.whiteTurn != this.pieces[this.draggingIndex].piece.isWhite) {
        console.log("Not your turn!");
        this.resetDraggedPiece($event);
        return;
      }
    }
    else {
      console.log("Illegal move!");
      this.resetDraggedPiece($event);
      return;
    }
    
    console.log(droppedIndex);
    this.moveInWaiting = [this.pieces[this.draggingIndex].piece.row, this.pieces[this.draggingIndex].piece.col, droppedIndex.y, droppedIndex.x];
    if(this.pieces[this.draggingIndex].piece instanceof Pawn && droppedIndex.y % 7 == 0){
      this.promotionDialogVisible = true;}
    else{
      this.executeNextStep(this.moveInWaiting);
    }
    let gameStatus : any = this.game.checkForGameEnd(!this.game.gameParams.whiteTurn);
    if(gameStatus.result != "Continue" ){
      console.log(gameStatus);
      let id = this.gameId.toString();
      this.socket.emit("gameend", {room: id, status: gameStatus })
    }
    this.possibleMoves = [];
    this.linkPieces();
  }

  executeNextStep(move:any,promotion:string ='none'){
    let id = this.gameId.toString();
    if(promotion == "none"){
      this.game.nextStep(move);
      this.socket.emit("make move", { startX: move[1], startY: move[0], endX: move[3], endY: move[2], room: id, FEN: this.game.getCurrentPosition(), pastPositions: this.game.gameParams.pastPositions })
    }
    else{ 
      this.game.nextStep(move, promotion);
      this.socket.emit("make move", { startX: move[1], startY: move[0], endX: move[3], endY: move[2], promotion:promotion, room: id, FEN: this.game.getCurrentPosition(), pastPositions: this.game.gameParams.pastPositions })
    }
  }


  promoteQueen(){
    this.executeNextStep(this.moveInWaiting,"q");
    this.promotionDialogVisible = false;
  }
  promoteRook(){
    this.executeNextStep(this.moveInWaiting,"r");
    this.promotionDialogVisible = false;
  }
  promoteBishop(){
    this.executeNextStep(this.moveInWaiting,"b");
    this.promotionDialogVisible = false;
  }
  promoteKnight(){
    this.executeNextStep(this.moveInWaiting,"n");
    this.promotionDialogVisible = false;
  }

  resetDraggedPiece($event: CdkDragEnd) {
    this.pieces[this.draggingIndex].pos = {
      x: $event.source.freeDragPosition.x,
      y: $event.source.freeDragPosition.y
    };
    this.possibleMoves = [];
  };

  ngOnDestroy(): void {
      this.socket.close();
  }
}
