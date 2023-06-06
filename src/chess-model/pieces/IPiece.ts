import { Board } from "../Board";
import { GameParams } from "../GameParams";
import { Move } from "../Move";

interface IPiece {
    row: number;
    col: number;
    isWhite: boolean | undefined;
    possibleMoves: Move[];
    class: string;
    calculateMoves(board: Board, gameParams: GameParams): void;
    getRepresentation(): string;
    getRepresentingChar(): string;
}

export { IPiece }