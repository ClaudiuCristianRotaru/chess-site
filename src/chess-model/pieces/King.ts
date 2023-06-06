import { IPiece } from "./IPiece";
import { Move } from "../Move";
import { Board } from "../Board";
import { Empty } from "./EmptyPiece";
import { GameParams } from "../GameParams";
class King implements IPiece {
    row: number;
    col: number;
    isWhite: boolean | undefined;
    possibleMoves: Move[] = [];
    class: string;
    constructor(row: number, col: number, isWhite: boolean) {
        this.row = row;
        this.col = col;
        this.isWhite = isWhite
        this.class = isWhite ? "wk":"bk";
    }

    calculateMoves(board: Board, gameParams: GameParams): void {
        this.possibleMoves = [];
        let dirX: number[] = [1, -1, 0, 0, 1, 1, -1, -1];
        let dirY: number[] = [0, 0, 1, -1, 1, -1, 1, -1];
        for (let i = 0; i < 8; i++) {
            try {
                let newRow: number = this.row + dirY[i];
                let newCol: number = this.col + dirX[i];
                let currentSquare: IPiece = board.board[newRow][newCol];
                if (currentSquare instanceof Empty) {
                    let virtualBoard: Board = new Board();
                    virtualBoard.copy(board);
                    let move: Move = new Move(this, [newRow, newCol], undefined);
                    virtualBoard.executeMove(move);
                    if (!virtualBoard.isSquareInCheck([newRow, newCol], !this.isWhite))
                        this.possibleMoves.push(move);
                    currentSquare = board.board[newRow][newCol];
                } else {
                    if (currentSquare.isWhite != this.isWhite) {
                        let virtualBoard: Board = new Board();
                        virtualBoard.copy(board);
                        let move: Move = new Move(this, [newRow, newCol], currentSquare);
                        virtualBoard.executeMove(move);
                        if (!virtualBoard.isSquareInCheck([newRow, newCol], !this.isWhite))
                            this.possibleMoves.push(move);
                    }
                }
            }
            catch (err) {
            }
        }

        //short castling 
        let shortCastlePossible: boolean = this.isWhite ? gameParams.whiteShortCastle : gameParams.blackShortCastle;

        if( board.isSquareInCheck([this.row,this.col],!this.isWhite) ||
            board.isSquareInCheck([this.row,this.col + 1],!this.isWhite) ||
            board.isSquareInCheck([this.row,this.col + 2],!this.isWhite)) {
                shortCastlePossible = false;
            }

        if( !(board.board[this.row][this.col + 1] instanceof Empty) ||
            !(board.board[this.row][this.col + 2] instanceof Empty)) {
                shortCastlePossible = false;
            }

        if(shortCastlePossible) {
            let move: Move = new Move(this,[this.row,this.col + 2], undefined);
            move.nextMove = new Move(board.board[this.row][this.col + 3],[this.row,this.col + 1], undefined)
            this.possibleMoves.push(move);
        }

        //long castling
        let longCastlePossible: boolean = this.isWhite ? gameParams.whiteLongCastle : gameParams.blackLongCastle;
        
        if( board.isSquareInCheck([this.row,this.col],!this.isWhite) ||
            board.isSquareInCheck([this.row,this.col - 1],!this.isWhite) ||
            board.isSquareInCheck([this.row,this.col - 2],!this.isWhite)) {
                longCastlePossible = false;
            }

        if( !(board.board[this.row][this.col - 1] instanceof Empty) ||
            !(board.board[this.row][this.col - 2] instanceof Empty) ||
            !(board.board[this.row][this.col - 3] instanceof Empty)) {
                longCastlePossible = false;
            }

        if(longCastlePossible) {
            let move: Move = new Move(this,[this.row,this.col - 2], undefined);
            move.nextMove = new Move(board.board[this.row][this.col - 4],[this.row,this.col - 1], undefined)
            this.possibleMoves.push(move);
        }
    }
    getRepresentation(): string {
        let rep: string = this.isWhite ? "♔" : "♚";
        return rep
    }
    getRepresentingChar(): string {
        let rep: string = this.isWhite ? "K" : "k";
        return rep
    }
}

export { King }