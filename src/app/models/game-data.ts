import { UserData } from "./user-data";

export interface GameData {
    id: string;
    black_player: UserData;
    white_player: UserData;
    result: string;
    FENS: string;
    chat_logs: string;
    date: Date;
}