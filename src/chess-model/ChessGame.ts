import { Empty } from './pieces/EmptyPiece';
import { IPiece } from './pieces/IPiece';
import { Knight } from './pieces/Knight';
import { Pawn } from './pieces/Pawn';
import { Rook } from './pieces/Rook';
import { Bishop } from './pieces/Bishop';
import { King } from './pieces/King';
import { Queen } from './pieces/Queen';
import { Move } from './Move';
import { Board } from './Board';
import { GameParams } from './GameParams';

class ChessGame {
    gameParams: GameParams;
    chessBoard: Board;
    isRunning: boolean;
    constructor() {
        this.gameParams = new GameParams();
        this.chessBoard = new Board();
        this.isRunning = true;
    }

    convertFileToDigit: any = {
        a: 0,
        b: 1,
        c: 2,
        d: 3,
        e: 4,
        f: 5,
        g: 6,
        h: 7,
    }
    convertFileToLetter: any = {
        0: 'a',
        1: 'b',
        2: 'c',
        3: 'd',
        4: 'e',
        5: 'f',
        6: 'g',
        7: 'h'
    }

    setupFromFEN(FEN: string): void {

        let FENComponents: string[] = FEN.split(" ");

        let pos: number = 0;

        for (let i = 0; i < FENComponents[0].length; i++) {
            let letter = FENComponents[0][i];
            if (!isNaN(+letter)) {
                pos += parseInt(letter);
            }
            switch (letter) {
                case 'r':
                    this.gameParams.blackPieces.push(new Rook(7 - Math.floor(pos / 8), pos % 8, false));
                    pos++;
                    break;
                case 'n':
                    this.gameParams.blackPieces.push(new Knight(7 - Math.floor(pos / 8), pos % 8, false));
                    pos++;
                    break;
                case 'b':
                    this.gameParams.blackPieces.push(new Bishop(7 - Math.floor(pos / 8), pos % 8, false));
                    pos++;
                    break;
                case 'q':
                    this.gameParams.blackPieces.push(new Queen(7 - Math.floor(pos / 8), pos % 8, false));
                    pos++;
                    break;
                case 'k':
                    let bKing: King = new King(7 - Math.floor(pos / 8), pos % 8, false);
                    this.gameParams.blackKing = bKing;
                    this.gameParams.blackPieces.push(bKing);
                    pos++;
                    break;
                case 'p':
                    this.gameParams.blackPieces.push(new Pawn(7 - Math.floor(pos / 8), pos % 8, false));
                    pos++;
                    break;
                case 'R':
                    this.gameParams.whitePieces.push(new Rook(7 - Math.floor(pos / 8), pos % 8, true));
                    pos++;
                    break;
                case 'N':
                    this.gameParams.whitePieces.push(new Knight(7 - Math.floor(pos / 8), pos % 8, true));
                    pos++;
                    break;
                case 'B':
                    this.gameParams.whitePieces.push(new Bishop(7 - Math.floor(pos / 8), pos % 8, true));
                    pos++;
                    break;
                case 'Q':
                    this.gameParams.whitePieces.push(new Queen(7 - Math.floor(pos / 8), pos % 8, true));
                    pos++;
                    break;
                case 'K':
                    let wKing: King = new King(7 - Math.floor(pos / 8), pos % 8, true);
                    this.gameParams.whiteKing = wKing;
                    this.gameParams.whitePieces.push(wKing);
                    pos++;
                    break;
                case 'P':
                    this.gameParams.whitePieces.push(new Pawn(7 - Math.floor(pos / 8), pos % 8, true));
                    pos++;
                    break;
            }
        }

        this.gameParams.whiteTurn = (FENComponents[1] === "w");

        if (FENComponents.length == 2) return;

        this.gameParams.blackShortCastle = FENComponents[2].includes('q');
        this.gameParams.whiteLongCastle = FENComponents[2].includes('Q');
        this.gameParams.blackShortCastle = FENComponents[2].includes('k');
        this.gameParams.whiteShortCastle = FENComponents[2].includes('K');

        if (FENComponents[3] != "-") {
            this.gameParams.enPassantable = { row: parseInt(FENComponents[3][1]) - 1, col: this.convertFileToDigit[FENComponents[3][0]] };
        }

        this.gameParams.halfmovesSinceLastPawnOrCapture = parseInt(FENComponents[4]);

        this.gameParams.moveNumber = parseInt(FENComponents[5]);
    }

    getShortPosition(): string {
        let output: string = "";
        for (let i = 7; i >= 0; i--) {
            let emptyNr: number = 0;
            for (let j = 0; j < 8; j++) {
                if (this.chessBoard.board[i][j] instanceof Empty) {
                    emptyNr++;
                }
                else {
                    if (emptyNr != 0) {
                        output += emptyNr;
                    }
                    output += this.chessBoard.board[i][j].getRepresentingChar();
                    emptyNr = 0;
                }
            }
            if (emptyNr != 0) {
                output += emptyNr;
            }
            if (i != 0)
                output += '/';
        }

        output += " ";

        output += this.gameParams.whiteTurn ? "w" : "b";
        return output
    }

    getCurrentPosition(): string {
        let outputFEN: string = this.getShortPosition();

        outputFEN += " ";

        let castling: string = "";
        if (this.gameParams.whiteShortCastle)
            castling += "K";
        if (this.gameParams.whiteLongCastle)
            castling += "Q";
        if (this.gameParams.blackShortCastle)
            castling += "k";
        if (this.gameParams.blackLongCastle)
            castling += "q";
        if (castling == "")
            castling = "-";
        outputFEN += castling
        if (this.gameParams.enPassantable.row != -1) {
            outputFEN += ` ${this.convertFileToLetter[this.gameParams.enPassantable.col]}${this.gameParams.enPassantable.row + 1} `;
        }
        else {
            outputFEN += " - ";
        }

        outputFEN += `${this.gameParams.halfmovesSinceLastPawnOrCapture} ${this.gameParams.moveNumber}`;
        return outputFEN;
    }

    setupBoard(): void {
        this.chessBoard.setupBoard(this.gameParams.whitePieces.concat(this.gameParams.blackPieces));
        this.calculateMoves();
    }

    calculateMoves(): void {
        this.gameParams.whitePieces.forEach(piece => {
            piece.calculateMoves(this.chessBoard, this.gameParams);
        })
        this.gameParams.blackPieces.forEach(piece => {
            piece.calculateMoves(this.chessBoard, this.gameParams);
        })
    }

    getPossibleMovesNumber(whitePlaying: boolean): number {
        let movesCount: number = 0;
        let pieces: IPiece[]
        if (whitePlaying) {
            pieces = this.gameParams.whitePieces;
        }
        else {
            pieces = this.gameParams.blackPieces;
        }
        pieces.forEach(piece => {
            piece.possibleMoves.forEach(move => {
                movesCount++;
            })
        })
        return movesCount;
    }

    checkForGameEnd(forWhite: boolean): any {
        {
            let kingPos: { row: number, col: number };
            if (this.gameParams.whiteKing == undefined || this.gameParams.blackKing == undefined) {
                return { result: "Game not possible", message: "Error" };
            }
            kingPos = !forWhite ? { row: this.gameParams.whiteKing.row, col: this.gameParams.whiteKing.col } : { row: this.gameParams.blackKing.row, col: this.gameParams.blackKing.col };

            if (this.gameParams.halfmovesSinceLastPawnOrCapture >= 50) {
                return { result: "Draw", message: "50-move rule" };
            }

            let position = this.getShortPosition();
            let count = 0;
            this.gameParams.pastPositions.forEach(pos => {
                let posValue = pos;
                if (posValue == position)
                    count++;
            })

            console.log("repetition", count);
            if (count >= 3) {
                return { result: "Draw", message: "Repetition" };
            }

            if (this.chessBoard.isSquareInCheck(kingPos, forWhite)) {
                if (this.getPossibleMovesNumber(!forWhite) == 0) {
                    return { result: forWhite ? "White win" : "Black win", message: "checkmate" }
                }
                // else {
                //     console.log("check");
                // }
            }
            else {
                if (this.getPossibleMovesNumber(!forWhite) == 0) {
                    return { result: "Draw", message: "Stalemate" }
                }
            }
            return { result: "Continue", message: "" }
        }

    }

    nextStep(args: number[], promotion = "r"): void {
        let pieces: IPiece[]
        if (this.gameParams.whiteTurn) {
            pieces = this.gameParams.whitePieces;
        }
        else {
            pieces = this.gameParams.blackPieces;
        }
        let selectedMove: Move | undefined;
        pieces.forEach(piece => {
            piece.possibleMoves.forEach(move => {
                if (move.piece.row == args[0] &&
                    move.piece.col == args[1] &&
                    move.endPosition[0] == args[2] &&
                    move.endPosition[1] == args[3]) {
                    selectedMove = move;
                }
            })
        })
        if (selectedMove) {
            this.gameParams.pastPositions.push(this.getShortPosition());
            if (!selectedMove.piece.isWhite)
                this.gameParams.moveNumber++;
            this.gameParams.halfmovesSinceLastPawnOrCapture++;
            this.updateGameParams(selectedMove);
            while (selectedMove) {
                this.chessBoard.executeMove(selectedMove);
                selectedMove.piece.row = selectedMove.endPosition[0];
                selectedMove.piece.col = selectedMove.endPosition[1];
                if (selectedMove.capturedPiece) {
                    if (this.gameParams.whiteTurn)
                        this.gameParams.blackPieces.splice(this.gameParams.blackPieces.indexOf(selectedMove.capturedPiece), 1);
                    else
                        this.gameParams.whitePieces.splice(this.gameParams.whitePieces.indexOf(selectedMove.capturedPiece), 1);
                }
                this.checkPromotion(selectedMove, promotion);
                selectedMove = selectedMove.nextMove;
            }

            this.calculateMoves();
            this.gameParams.whiteTurn = !this.gameParams.whiteTurn;
            this.chessBoard.print(this.gameParams.whiteTurn);
        }
    }

    checkPromotion(selectedMove: Move, promotion: string) {
        if (selectedMove.piece instanceof Pawn) {
            if ((selectedMove.endPosition[0] == 7 && selectedMove.piece.isWhite) ||
                (selectedMove.endPosition[0] == 0 && !selectedMove.piece.isWhite)) {
                let piece: IPiece;
                let color: boolean = selectedMove.piece.isWhite ? true : false;
                switch (promotion) {
                    case 'q':
                        piece = new Queen(selectedMove.endPosition[0], selectedMove.endPosition[1], color);
                        break;
                    case 'r':
                        piece = new Rook(selectedMove.endPosition[0], selectedMove.endPosition[1], color);
                        break;
                    case 'n':
                        piece = new Knight(selectedMove.endPosition[0], selectedMove.endPosition[1], color);
                        break;
                    case 'b':
                        piece = new Bishop(selectedMove.endPosition[0], selectedMove.endPosition[1], color);
                        break;
                    default:
                        piece = new Queen(selectedMove.endPosition[0], selectedMove.endPosition[1], color);
                        break;
                }
                if (this.gameParams.whiteTurn) {
                    this.gameParams.whitePieces.splice(this.gameParams.whitePieces.indexOf(selectedMove.piece), 1);
                    this.gameParams.whitePieces.push(piece);

                }
                else {
                    this.gameParams.blackPieces.splice(this.gameParams.blackPieces.indexOf(selectedMove.piece), 1);
                    this.gameParams.blackPieces.push(piece);
                }
                this.chessBoard.board[selectedMove.endPosition[0]][selectedMove.endPosition[1]] = piece;
            }
        }
    }

    getSidePiecesValue(white: boolean) {
        let result: number = 0;
        if (white) {
            this.gameParams.whitePieces.forEach(piece => {
                result += piece.value;
            })
        } else {
            this.gameParams.blackPieces.forEach(piece => {
                result += piece.value;
            })
        }
        return result;
    }

    updateGameParams(move: Move) {

        this.gameParams.enPassantable = { row: -1, col: -1 };
        if (move.piece instanceof Pawn || move.capturedPiece != undefined) {
            this.gameParams.halfmovesSinceLastPawnOrCapture = 0;
        }

        if (move.piece instanceof Pawn) {
            if (Math.abs(move.piece.row - move.endPosition[0]) == 2) {
                this.gameParams.enPassantable = { row: move.piece.isWhite ? 2 : 5, col: move.piece.col };
            }
        }
        if (move.piece instanceof King) {
            if (move.piece.isWhite) {
                this.gameParams.whiteLongCastle = false;
                this.gameParams.whiteShortCastle = false;
            }
            else {
                this.gameParams.blackLongCastle = false;
                this.gameParams.blackShortCastle = false;
            }
        }
        if (move.piece instanceof Rook) {
            if (move.piece.isWhite) {
                if (move.piece.col == 0) this.gameParams.whiteLongCastle = false;
                if (move.piece.col == 7) this.gameParams.whiteShortCastle = false;
            }
            else {
                if (move.piece.col == 0) this.gameParams.blackLongCastle = false;
                if (move.piece.col == 7) this.gameParams.blackShortCastle = false;
            }
        }
    }
}

export { ChessGame }