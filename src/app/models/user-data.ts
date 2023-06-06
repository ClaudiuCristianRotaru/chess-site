export interface UserData {
    id: string;
    username: string;
    email: string;
    rating: number;
    creationDate: Date;
    jwt?: string;
}