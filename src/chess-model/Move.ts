import { IPiece } from "./pieces/IPiece";

let convertFile : any = { 0:'a', 1:'b', 2:'c', 3:'d', 4:'e', 5:'f', 6:'g', 7:'h' }; 

class Move {

    nextMove: Move = undefined!;
    endPosition : [number,number];
    piece: IPiece;
    capturedPiece?: IPiece;
    constructor(piece: IPiece,
                endPosition: [number,number],
                capturedPiece?: IPiece) {
        this.piece = piece;
        this.endPosition = endPosition;
        this.capturedPiece = capturedPiece;
    }

    printNotation() : string {
        return `${this.piece.getRepresentingChar()}${convertFile[this.piece.col]}${this.piece.row+1}${this.capturedPiece ? 'x' : '-'}${convertFile[this.endPosition[1]]}${this.endPosition[0]+1}`
    }
}



export { Move }