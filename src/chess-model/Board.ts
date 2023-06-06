import { Empty } from './pieces/EmptyPiece';
import { IPiece } from './pieces/IPiece';
import { Knight } from './pieces/Knight';
import { Pawn } from './pieces/Pawn';
import { Rook } from './pieces/Rook';
import { Bishop } from './pieces/Bishop';
import { King } from './pieces/King';
import { Queen } from './pieces/Queen';
import { Move } from './Move';

class Board {
    board: IPiece[][];
    constructor() {
        this.board = [];
        for (let i = 0; i < 8; i++) {
            this.board[i] = [];
            for (let j = 0; j < 8; j++) {
                this.board[i][j] = new Empty();
            }
        }
    };

    print(whitePOV : boolean): void {
        let lettering: string = whitePOV ? "  A   B   C   D   E   F   G   H" : "  H   G   F   E   D   C   B   A";
        console.log(lettering);
        for (let i = 0; i < 8; i++) {
            let aux: string = `${whitePOV ? 7 - i + 1 : i + 1} `;
            for (let j = 0; j < 8; j++) {
                let row = whitePOV ? 7 - i : i;
                let col = whitePOV ? j : 7 - j;
                aux += this.board[row][col].getRepresentation() + "  ";
            }
            console.log(aux);
        }
        console.log(lettering);
        console.log(this);
    }

    copy(b: Board): void {
        for (let i = 0; i < 8; i++) {
            for (let j = 0; j < 8; j++) {
                this.board[i][j] = b.board[i][j];
            }
        }
    }

    setupBoard(pieces : IPiece[]): void {
        pieces.forEach(piece => {
            this.board[piece.row][piece.col] = piece;
        });
    }

    executeTestMove(): void {
        let move: Move = new Move(this.board[1][4], [3, 4], undefined);
        this.board[move.piece.row][move.piece.col] = new Empty();
        move.piece.row = move.endPosition[0];
        move.piece.col = move.endPosition[1];
        this.board[move.endPosition[0]][move.endPosition[1]] = move.piece;
    }


    executeMove(move: Move): void {
        this.board[move.piece.row][move.piece.col] = new Empty();
        if(move.capturedPiece){
            this.board[move.capturedPiece.row][move.capturedPiece.col] = new Empty();
        }
        this.board[move.endPosition[0]][move.endPosition[1]] = move.piece;
    }

    isSquareInCheck(coords: [number, number], isWhiteControlled: boolean): boolean {
        //check for pawns
        var direction: number = isWhiteControlled ? -1 : 1;
        try {
            let currentSquare: IPiece = this.board[coords[0] + direction][coords[1] + 1];
            if (!(currentSquare instanceof Empty)) {
                if (currentSquare.isWhite == isWhiteControlled) {
                    if (currentSquare instanceof Pawn) {
                        //console.log("pawn controlled");
                        return true;
                    }
                }
            }
        }
        catch (error) { }
        try {
            let currentSquare: IPiece = this.board[coords[0] + direction][coords[1] - 1];
            if (!(currentSquare instanceof Empty)) {
                if (currentSquare.isWhite == isWhiteControlled) {
                    if (currentSquare instanceof Pawn) {
                        //console.log("pawn controlled");
                        return true;
                    }
                }
            }
        }
        catch (error) { }
        //check vertical/horizontal squares

        let dirX: number[] = [1, -1, 0, 0];
        let dirY: number[] = [0, 0, 1, -1];

        for (let i = 0; i < 4; i++) {
            try {
                let range: number = 1;
                let currentSquare: IPiece = this.board[coords[0] + range * dirY[i]][coords[1] + range * dirX[i]];
                while (currentSquare instanceof Empty) {
                    range++;
                    currentSquare = this.board[coords[0] + range * dirY[i]][coords[1] + range * dirX[i]];
                }
                if (currentSquare.isWhite != isWhiteControlled)
                    continue;
                if (currentSquare instanceof King && range == 1) {
                    //console.log("king controlled");
                    return true;
                }
                if (currentSquare instanceof Rook) {
                    //console.log("rook controlled");
                    return true;
                }
                if (currentSquare instanceof Queen) {
                    //console.log("queen controlled");
                    return true;
                }
            }
            catch (error) { }
        }
        //check diagonal squares

        dirX = [1, 1, -1, -1];
        dirY = [1, -1, 1, -1];

        for (let i = 0; i < 4; i++) {
            try {
                let range: number = 1;
                let currentSquare: IPiece = this.board[coords[0] + range * dirY[i]][coords[1] + range * dirX[i]];
                while (currentSquare instanceof Empty) {
                    range++;
                    currentSquare = this.board[coords[0] + range * dirY[i]][coords[1] + range * dirX[i]];
                }
                if (currentSquare.isWhite != isWhiteControlled)
                    continue;
                if (currentSquare instanceof King && range == 1) {
                    //console.log("king controlled");
                    return true;
                }
                if (currentSquare instanceof Bishop) {
                    //console.log("bishop controlled");
                    return true;
                }
                if (currentSquare instanceof Queen) {
                    //console.log("queen controlled");
                    return true;
                }
            }
            catch (error) { }
        }

        //checking for knights
        dirX = [-1, 1, 2, 2, 1, -1, -2, -2];
        dirY = [2, 2, 1, -1, -2, -2, 1, -1];

        for (let i = 0; i < 8; i++) {
            try {
                let currentSquare: IPiece = this.board[coords[0] + dirY[i]][coords[1] + dirX[i]];
                if (currentSquare.isWhite != isWhiteControlled)
                    continue;
                if (currentSquare instanceof Knight) {
                    //console.log("knight controlled");
                    return true;
                }
            }
            catch (error) { }
        }
        return false;
    }
}

export { Board }