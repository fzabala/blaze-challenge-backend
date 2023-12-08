import { TeamModelType } from "types";
import { query } from "../database";
import { apiKeyFootbalRequest } from "./api";

export const syncTeamService = async (teamId: number) => {
    const teams = await apiKeyFootbalRequest<TeamModelType[]>({action: 'get_teams', team_id: teamId.toString()});
    const {team_key, team_name, team_country, team_badge, players} = teams[0];
  
    const currentTeam = await query(`SELECT * FROM teams WHERE team_key=$1`, [teamId]);
    let response = true;
    if(currentTeam.rowCount === 0){
      const insert = await query(`INSERT INTO 
        teams (team_key, team_name, team_country, team_badge)
        VALUES ($1, $2, $3, $4)`, 
      [team_key, team_name, team_country, team_badge]);
      response ||= insert.rowCount > 0;
    } else {
      const update = await query(`UPDATE teams
        SET team_name=$2, team_country=$3, team_badge=$4
        WHERE team_key=$1`,
      [team_key, team_name, team_country, team_badge]);
      response ||= update.rowCount > 0;
    }

    for (const player of players) {
      try{
        const currentPlayer = await query(`SELECT * FROM players WHERE player_key=$1`, [player.player_key]);
        const { player_key,
          player_image,
          player_name,
          player_number,
          player_country,
          player_type,
          player_age,
          player_birthdate,
        } = player;
        
        let response = true;

        if(currentPlayer.rowCount === 0){
          const insert = await query(`INSERT INTO 
            players (player_key,
              player_image,
              player_name,
              player_number,
              player_country,
              player_type,
              player_age,
              player_birthdate,
              team_key)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)`, 
          [player_key,
            player_image,
            player_name,
            player_number,
            player_country,
            player_type,
            player_age,
            player_birthdate,
            teamId]);
          response ||= insert.rowCount > 0;
        } else {
          const update = await query(`UPDATE players
            SET player_image=$2, player_name=$3, player_number=$4, player_country=$5, player_type=$6, player_age=$7, player_birthdate=$8, team_key=$9
            WHERE player_key=$1`,
          [player_key,
            player_image,
            player_name,
            player_number,
            player_country,
            player_type,
            player_age,
            player_birthdate,
            teamId]);
          response ||= update.rowCount > 0;
        }
      }catch(e){
        console.error({e});
      }
    }
    return response
};
