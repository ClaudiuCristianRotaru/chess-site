import { IPiece } from "./IPiece";
import { Move } from "../Move";
import { Board } from "../Board";
import { Empty } from "./EmptyPiece";
import { GameParams } from "../GameParams";

class Rook implements IPiece {
    row: number;
    col: number;
    isWhite: boolean | undefined;
    possibleMoves: Move[] = [];
    class: string;
    constructor(row: number, col: number, isWhite: boolean) {
        this.row = row;
        this.col = col;
        this.isWhite = isWhite;
        this.class = isWhite ? "wr":"br";
    }

    calculateMoves(board: Board, gameParams: GameParams): void {
        this.possibleMoves = [];
        let dirX: number[] = [1, -1, 0, 0];
        let dirY: number[] = [0, 0, 1, -1];
        for (let i = 0; i < 4; i++) {
            try {
                let range: number = 1;
                let newRow: number = this.row + range * dirY[i];
                let newCol: number = this.col + range * dirX[i];
                let currentSquare: IPiece = board.board[newRow][newCol];
                while (currentSquare instanceof Empty) {
                    let virtualBoard: Board = new Board();
                    virtualBoard.copy(board);
                    let move: Move = new Move(this, [newRow, newCol], undefined);
                    virtualBoard.executeMove(move);
                    let kingRow = this.isWhite ? gameParams.whiteKing.row : gameParams.blackKing.row;
                    let kingCol = this.isWhite ? gameParams.whiteKing.col : gameParams.blackKing.col;
                    if (!virtualBoard.isSquareInCheck([kingRow, kingCol], !this.isWhite))
                        this.possibleMoves.push(move);
                    range++;
                    newRow = this.row + range * dirY[i];
                    newCol = this.col + range * dirX[i];
                    currentSquare = board.board[newRow][newCol];
                }
                if (currentSquare.isWhite != this.isWhite) {
                    let virtualBoard: Board = new Board();
                    virtualBoard.copy(board);
                    let move: Move = new Move(this, [newRow, newCol], currentSquare);
                    virtualBoard.executeMove(move);
                    let kingRow = this.isWhite ? gameParams.whiteKing.row : gameParams.blackKing.row;
                    let kingCol = this.isWhite ? gameParams.whiteKing.col : gameParams.blackKing.col;
                    if (!virtualBoard.isSquareInCheck([kingRow, kingCol], !this.isWhite))
                        this.possibleMoves.push(move);
                }
            }
            catch (err) {
            }
        }
    }
    getRepresentation(): string {
        let rep: string = this.isWhite ? "♖" : "♜";
        return rep
    }
    getRepresentingChar(): string {
        let rep: string = this.isWhite ? "R" : "r";
        return rep
    }
}

export { Rook }