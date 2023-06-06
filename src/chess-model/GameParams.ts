import { Move } from "./Move";
import { IPiece } from "./pieces/IPiece"
import { King } from "./pieces/King";
class GameParams {
    whitePieces : IPiece[] = [];
    blackPieces : IPiece[] = [];
    capturedWhitePieces : IPiece[] = [];
    capturedBlackPieces : IPiece[] = [];
    pastPositions : string[] = [];
    enPassantable : [number , number ] = [-1,-1];
    whiteKing : King = new King(-1,-1,true);;
    blackKing : King = new King(-1,-1,false);
    whiteTurn : boolean = false;
    whiteLongCastle : boolean = true;
    blackLongCastle : boolean = true;
    whiteShortCastle : boolean = true;
    blackShortCastle : boolean = true;
    halfmovesSinceLastPawnOrCapture : number = 0;
    moveNumber : number = 1;
}

export { GameParams }