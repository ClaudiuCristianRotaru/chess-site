import { IPiece } from "./IPiece";
import { Move } from "../Move";
import { Board } from "../Board";
import { Empty } from "./EmptyPiece";
import { GameParams } from "../GameParams";
class Pawn implements IPiece {
    row: number;
    col: number;
    isWhite: boolean | undefined;
    possibleMoves: Move[] = [];
    class: string;
    value: number;
    constructor(row: number, col: number, isWhite: boolean) {
        this.row = row;
        this.col = col;
        this.isWhite = isWhite
        this.class = isWhite ? "wp":"bp";
        this.value = 1;
    }



    calculateMoves(board: Board, gameParams: GameParams): void {
        this.possibleMoves = [];
        var direction: number = this.isWhite ? 1 : -1;
        //1 move
        try {
            if (board.board[this.row + direction][this.col] instanceof Empty) {
                let virtualBoard: Board = new Board();
                virtualBoard.copy(board);
                let move: Move = new Move(this, [this.row + direction, this.col], undefined);
                virtualBoard.executeMove(move);
                let kingRow = this.isWhite ? gameParams.whiteKing.row : gameParams.blackKing.row;
                let kingCol = this.isWhite ? gameParams.whiteKing.col : gameParams.blackKing.col;
                if (!virtualBoard.isSquareInCheck({row:kingRow,col:kingCol}, !this.isWhite))
                    this.possibleMoves.push(move);
            }
        }
        catch (error) { }
        //2 move
        try {
            var startRank = this.isWhite ? 1 : 6;
            if (this.row == startRank && this.possibleMoves.length == 1) {
                if (board.board[this.row + 2 * direction][this.col] instanceof Empty) {
                    let virtualBoard: Board = new Board();
                    virtualBoard.copy(board);
                    let move: Move = new Move(this, [this.row + 2 * direction, this.col], undefined);
                    virtualBoard.executeMove(move);
                    let kingRow = this.isWhite ? gameParams.whiteKing.row : gameParams.blackKing.row;
                    let kingCol = this.isWhite ? gameParams.whiteKing.col : gameParams.blackKing.col;
                    if (!virtualBoard.isSquareInCheck({row:kingRow,col:kingCol}, !this.isWhite))
                        this.possibleMoves.push(move);
                }
            }
        }
        catch (error) { }
        //captures
        try {
            if (!(board.board[this.row + direction][this.col + 1] instanceof Empty)) {
                if (board.board[this.row + direction][this.col + 1].isWhite != this.isWhite) {
                    let virtualBoard: Board = new Board();
                    virtualBoard.copy(board);
                    let move: Move = new Move(this, [this.row + direction, this.col + 1], board.board[this.row + direction][this.col + 1]);
                    virtualBoard.executeMove(move);
                    let kingRow = this.isWhite ? gameParams.whiteKing.row : gameParams.blackKing.row;
                    let kingCol = this.isWhite ? gameParams.whiteKing.col : gameParams.blackKing.col;
                    if (!virtualBoard.isSquareInCheck({row:kingRow,col:kingCol}, !this.isWhite))
                        this.possibleMoves.push(move);
                }
            }
            if(this.row + direction == gameParams.enPassantable.row && this.col + 1 == gameParams.enPassantable.col) {
                let virtualBoard: Board = new Board();
                    virtualBoard.copy(board);
                    let move: Move = new Move(this, [this.row + direction, this.col + 1], board.board[this.row][this.col + 1]);
                    virtualBoard.executeMove(move);
                    let kingRow = this.isWhite ? gameParams.whiteKing.row : gameParams.blackKing.row;
                    let kingCol = this.isWhite ? gameParams.whiteKing.col : gameParams.blackKing.col;
                    if (!virtualBoard.isSquareInCheck({row:kingRow,col:kingCol}, !this.isWhite))
                        this.possibleMoves.push(move);
            }
        }
        catch (error) { }

        try {
            if (!(board.board[this.row + direction][this.col - 1] instanceof Empty)) {
                if (board.board[this.row + direction][this.col - 1].isWhite != this.isWhite) {
                    let virtualBoard: Board = new Board();
                    virtualBoard.copy(board);
                    let move: Move = new Move(this, [this.row + direction, this.col - 1], board.board[this.row + direction][this.col - 1]);
                    virtualBoard.executeMove(move);
                    let kingRow = this.isWhite ? gameParams.whiteKing.row : gameParams.blackKing.row;
                    let kingCol = this.isWhite ? gameParams.whiteKing.col : gameParams.blackKing.col;
                    if (!virtualBoard.isSquareInCheck({row:kingRow,col:kingCol}, !this.isWhite))
                        this.possibleMoves.push(move);
                }
            }
            if(this.row + direction == gameParams.enPassantable.row && this.col - 1 == gameParams.enPassantable.col) {
                let virtualBoard: Board = new Board();
                    virtualBoard.copy(board);
                    let move: Move = new Move(this, [this.row + direction, this.col - 1], board.board[this.row][this.col - 1]);
                    virtualBoard.executeMove(move);
                    let kingRow = this.isWhite ? gameParams.whiteKing.row : gameParams.blackKing.row;
                    let kingCol = this.isWhite ? gameParams.whiteKing.col : gameParams.blackKing.col;
                    if (!virtualBoard.isSquareInCheck({row:kingRow,col:kingCol}, !this.isWhite))
                        this.possibleMoves.push(move);
            }
        }
        catch (error) { }
    }
    getRepresentation(): string {
        let rep: string = this.isWhite ? "♙" : "♟";
        return rep
    }
    getRepresentingChar(): string {
        let rep: string = this.isWhite ? "P" : "p";
        return rep
    }
}

export { Pawn }