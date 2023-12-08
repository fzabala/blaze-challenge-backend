import { query } from "../database";

export const getPlayersByTeamService = async (teamId: number) => {
  const players = await query(`SELECT * FROM players WHERE team_key=$1`, [teamId.toString()]);
  return players.rows;
};