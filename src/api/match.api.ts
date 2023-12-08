import { MatchModelType } from "types";
import { query } from "../database";
import { apiKeyFootbalRequest } from "./api";
import { format } from "date-fns";

export const syncMatchesService = async (teamId: number) => {
  const date_format = 'yyyy-MM-dd';
  const from = `${(new Date()).getFullYear()}-01-01`;
  const to = format(new Date(), date_format);
  const matches = await apiKeyFootbalRequest<MatchModelType[]>({action: 'get_events', team_id: teamId.toString(), from, to});
  // { matches: { error: 201, message: 'Required parameters missing' } }
  let response = true;

  matches.forEach(async match => {
    const currentMatch = await query(`SELECT * FROM matches WHERE match_id=$1`, [match.match_id]);
  
    const { 
      match_id,
      country_id,
      country_name,
      league_id,
      league_name,
      match_date,
      match_status,
      match_time,
      match_hometeam_id,
      match_hometeam_name,
      match_hometeam_score,
      match_awayteam_name,
      match_awayteam_id,
      match_awayteam_score,
    } = match;
    
    let response = true;
  
    if(currentMatch.rowCount === 0){      
      const insert = await query(`INSERT INTO 
        matches (
          match_id,
          country_id,
          country_name,
          league_id,
          league_name,
          match_date,
          match_status,
          match_time,
          match_hometeam_id,
          match_hometeam_name,
          match_hometeam_score,
          match_awayteam_name,
          match_awayteam_id,
          match_awayteam_score
        )
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14)`, 
      [
        match_id,
        country_id,
        country_name,
        league_id,
        league_name,
        match_date,
        match_status,
        match_time,
        match_hometeam_id,
        match_hometeam_name,
        match_hometeam_score,
        match_awayteam_name,
        match_awayteam_id,
        match_awayteam_score
      ]);
      response ||= insert.rowCount > 0;
    } else {
      const update = await query(`UPDATE matches
        SET country_id=$2, country_name=$3, league_id=$4, league_name=$5, match_date=$6, match_status=$7, match_time=$8, match_hometeam_id=$9,
        match_hometeam_name=$10, match_hometeam_score=$11, match_awayteam_name=$12, match_awayteam_id=$13, match_awayteam_score=$14
        WHERE match_id=$1`,
      [
        match_id,
        country_id,
        country_name,
        league_id,
        league_name,
        match_date,
        match_status,
        match_time,
        match_hometeam_id,
        match_hometeam_name,
        match_hometeam_score,
        match_awayteam_name,
        match_awayteam_id,
        match_awayteam_score
      ]);
      response ||= update.rowCount > 0;
    }
  })
  return response
};