import { UserData } from "./user-data";

export interface GameData {
    id: string;
    blackPlayer: UserData;
    whitePlayer: UserData;
    result: string;
    FENS: string;
    chatLogs: string;
    date: Date;
    whiteRating: number;
    blackRating: number;
}