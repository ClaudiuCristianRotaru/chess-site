import { IPiece } from "./IPiece";
import { Move } from "../Move";
import { Board } from "../Board";
import { Empty } from "./EmptyPiece";
import { GameParams } from "../GameParams";
class Knight implements IPiece {
    row: number;
    col: number;
    isWhite: boolean | undefined;
    possibleMoves: Move[] = [];
    class:string; 
    constructor(row: number, col: number, isWhite: boolean) {
        this.row = row;
        this.col = col;
        this.isWhite = isWhite;
        this.class = isWhite ? "wn":"bn";
    }

    calculateMoves(board: Board, gameParams: GameParams): void {
        this.possibleMoves = [];
        let dirX: number[] = [-1, 1, 2, 2, 1, -1, -2, -2];
        let dirY: number[] = [2, 2, 1, -1, -2, -2, 1, -1];
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
                    let kingRow = this.isWhite ? gameParams.whiteKing.row : gameParams.blackKing.row;
                    let kingCol = this.isWhite ? gameParams.whiteKing.col : gameParams.blackKing.col;
                    if (!virtualBoard.isSquareInCheck([kingRow, kingCol], !this.isWhite))
                        this.possibleMoves.push(move);
                }
                else {
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
            }
            catch (err) {
            }
        }
    }
    getRepresentation(): string {
        let rep: string = this.isWhite ? "♘" : "♞";
        return rep
    }
    getRepresentingChar(): string {
        let rep: string = this.isWhite ? "N" : "n";
        return rep
    }

}

export { Knight }