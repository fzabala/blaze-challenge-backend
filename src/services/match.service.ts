import { query } from "../database";

export const getMatchesByTeamService = async (teamId: number) => {
  const matches = await query(`SELECT * FROM matches WHERE match_hometeam_id=$1 or match_awayteam_id=$2`, [teamId.toString(), teamId.toString()]);
  return matches.rows;
};
