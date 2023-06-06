import { IPiece } from "./IPiece";
import { Move } from "../Move";
import { Board } from "../Board";
import { GameParams } from "../GameParams";


class Empty implements IPiece {
    row: number;
    col: number;
    isWhite: boolean | undefined;
    possibleMoves: Move[] = [];
    class: string = "ep";
    constructor(){
        this.row = -1;
        this.col = -1;
    }

    calculateMoves(board: Board, gameParams: GameParams): void {
        
    }
    getRepresentation(): string {
        return "_ "
    }
    getRepresentingChar(): string {
        return "_ "
    }
}

export { Empty }