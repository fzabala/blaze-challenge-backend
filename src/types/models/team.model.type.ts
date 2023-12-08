import { PlayerModelType } from "./player.model.type";

export type TeamModelType = {
    team_key: string;
    team_name: string;
    team_country: string;
    team_founded: number;
    team_badge: string;
    players: PlayerModelType[];
}