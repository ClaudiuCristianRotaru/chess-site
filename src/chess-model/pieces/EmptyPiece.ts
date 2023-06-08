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
    value: number;
    constructor(){
        this.row = -1;
        this.col = -1;
        this.value = 0;
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