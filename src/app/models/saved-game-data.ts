import { GameData } from "./game-data";
import { UserData } from "./user-data";

export interface SavedGameData {
    id: string;
    note: string;
    game: GameData;
    user: UserData;
}

